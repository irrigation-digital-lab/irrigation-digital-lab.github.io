/**
 * GhostImage — decorative background image, purely visual.
 * opacity 0.04–0.07, soft radial fade at edges, pointer-events none.
 *
 * side: 'left' | 'right' | 'center'
 */
export default function GhostImage({ src, side = 'right', opacity = 0.05, style = {} }) {
  const masks = {
    right:  'radial-gradient(ellipse 75% 80% at 85% 50%, black 0%, transparent 100%)',
    left:   'radial-gradient(ellipse 75% 80% at 15% 50%, black 0%, transparent 100%)',
    center: 'radial-gradient(ellipse 65% 70% at 50% 50%, black 0%, transparent 100%)',
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity,
          maskImage: masks[side],
          WebkitMaskImage: masks[side],
          userSelect: 'none',
        }}
      />
    </div>
  )
}
