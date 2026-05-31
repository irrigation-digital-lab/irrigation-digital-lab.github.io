import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// Simulação de ondas — wave equation + input do rato
const SIM_FRAG = `
  precision highp float;
  uniform sampler2D u_state;
  uniform vec2 u_res;
  uniform vec2 u_mouse;
  uniform float u_active;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec2 px = 1.0 / u_res;

    vec4 s = texture2D(u_state, uv);
    float h = s.x, v = s.y;

    float n = texture2D(u_state, uv + vec2(0.0,  px.y)).x;
    float so= texture2D(u_state, uv - vec2(0.0,  px.y)).x;
    float e = texture2D(u_state, uv + vec2(px.x,  0.0)).x;
    float w = texture2D(u_state, uv - vec2(px.x,  0.0)).x;

    float newV = (v + (n + so + e + w - 4.0 * h) * 0.49) * 0.987;
    float newH = clamp(h + newV, -1.0, 1.0);

    if (u_active > 0.5) {
      float d = length(uv - u_mouse);
      newH += 0.6 * smoothstep(0.035, 0.0, d);
    }

    float gx = (e - w) * 0.5;
    float gy = (n - so) * 0.5;

    gl_FragColor = vec4(newH, newV, gx, gy);
  }
`

// Shader do utilizador — glint de luz solar sobre a superfície de água
const RENDER_FRAG = `
  precision highp float;
  uniform sampler2D u_data;
  uniform vec2 u_res;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    vec4 data = texture2D(u_data, uv);

    // Fundo preto — desaparece com mix-blend-mode: screen
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

    // Shader exato do utilizador — reflexo de luz solar na superfície
    vec3 normal = normalize(vec3(-data.z, 0.2, -data.w));
    float glint = pow(max(0.0, dot(normal, normalize(vec3(-3.0, 10.0, 3.0)))), 60.0);
    gl_FragColor += vec4(0.7, 0.92, 1.0, 1.0) * glint * 2.5;
  }
`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function createProgram(gl, vert, frag) {
  const p = gl.createProgram()
  gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vert))
  gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(p)
  return p
}

function createFBO(gl, w, h) {
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  const fb = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  return { tex, fb }
}

export default function WaterCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: false })
    if (!gl) return

    const ext = gl.getExtension('OES_texture_float')
    if (!ext) { console.warn('OES_texture_float not supported'); return }

    let W = window.innerWidth, H = window.innerHeight
    canvas.width = W; canvas.height = H

    // Quad fullscreen
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const simProg = createProgram(gl, VERT, SIM_FRAG)
    const renProg = createProgram(gl, VERT, RENDER_FRAG)

    let fboA = createFBO(gl, W, H)
    let fboB = createFBO(gl, W, H)

    const mouse = { x: 0.5, y: 0.5, active: false }

    const onMove = (e) => {
      mouse.x = e.clientX / W
      mouse.y = 1.0 - e.clientY / H
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false }
    const onClick = (e) => {
      mouse.x = e.clientX / W
      mouse.y = 1.0 - e.clientY / H
      mouse.active = true
      setTimeout(() => { mouse.active = false }, 80)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('click', onClick)

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
      fboA = createFBO(gl, W, H)
      fboB = createFBO(gl, W, H)
    }
    window.addEventListener('resize', resize)

    function bindQuad(prog) {
      const loc = gl.getAttribLocation(prog, 'a_pos')
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    }

    let raf
    function loop() {
      // Simulation pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.fb)
      gl.viewport(0, 0, W, H)
      gl.useProgram(simProg)
      bindQuad(simProg)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fboA.tex)
      gl.uniform1i(gl.getUniformLocation(simProg, 'u_state'), 0)
      gl.uniform2f(gl.getUniformLocation(simProg, 'u_res'), W, H)
      gl.uniform2f(gl.getUniformLocation(simProg, 'u_mouse'), mouse.x, mouse.y)
      gl.uniform1f(gl.getUniformLocation(simProg, 'u_active'), mouse.active ? 1.0 : 0.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Render pass
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, W, H)
      gl.useProgram(renProg)
      bindQuad(renProg)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fboB.tex)
      gl.uniform1i(gl.getUniformLocation(renProg, 'u_data'), 0)
      gl.uniform2f(gl.getUniformLocation(renProg, 'u_res'), W, H)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Ping-pong
      const tmp = fboA; fboA = fboB; fboB = tmp

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  )
}
