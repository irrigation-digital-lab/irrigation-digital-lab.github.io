import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  pt: {
    translation: {
      nav: {
        about: 'Sobre',
        areas: 'Áreas',
        whatwedo: 'O que Fazemos',
        fablab: 'Fab Lab',
        tools: 'Ferramentas',
        projects: 'Projetos',
        partners: 'Colaborações',
        contact: 'Contactos',
        home: 'Página Inicial',
      },
      hero: {
        tag: 'Agricultura 4.0',
        title: 'Laboratório Digital\nde Rega',
        title_line1: 'LABORATÓRIO',
        title_line2: 'DIGITAL',
        title_line3: 'DE REGA',
        subtitle: 'Infraestrutura de apoio ao ensino, investigação, demonstração e prototipagem em monitorização, modelação e apoio à decisão.',
        cta_primary: 'Explorar o Laboratório',
        cta_secondary: 'Ver Ferramentas',
        scroll: 'Scroll para explorar',
      },
      about: {
        label: 'Sobre nós',
        title: 'Infraestrutura digital pedagógica, científica e tecnológica que promove a integração entre conhecimento teórico, experimentação prática, inovação digital e resposta aos desafios atuais da agricultura de regadio.',
        text2: 'Integra uma Fab Lab de Rega, que é uma pequena oficina onde são concebidos, montados e testados protótipos aplicados à gestão da rega.',
        stat1_value: '4',
        stat1_label: 'Projetos Ativos',
        stat2_value: '6',
        stat2_label: 'Áreas de Investigação',
        stat3_value: '3',
        stat3_label: 'Missões Principais',
        quote: 'Conceber, montar e testar protótipos aplicados à gestão da rega.',
        lines_label: 'Linhas de atuação',
        lines: [
          { key: 'ensino',       val: '' },
          { key: 'investigação', val: '' },
          { key: 'demonstração', val: '' },
          { key: 'prototipagem', val: '' },
        ],
      },
      areas: {
        label: 'Áreas de Atividade',
        title: 'O que investigamos',
        subtitle: 'Seis áreas de conhecimento e tecnologia formam o núcleo do laboratório digital.',
        items: [
          { title: 'Condução da rega', desc: 'Solo, planta e clima — dados integrados para decisões mais eficientes.' },
          { title: 'Sensores e IoT', desc: 'Dados em tempo real para monitorização contínua e automatizada.' },
          { title: 'Teledeteção', desc: 'Satélite, drone e imagens para análise espacial da agricultura.' },
          { title: 'Alterações Climáticas', desc: 'Resiliência e adaptação dos sistemas de rega ao novo clima.' },
          { title: 'Modelação e Apoio à Decisão', desc: 'Ferramentas digitais para otimização e gestão hídrica.' },
          { title: 'NEXUS Água-Energia', desc: 'Eficiência integrada entre recursos hídricos e energéticos.' },
        ],
      },
      whatwedo: {
        label: 'O que Fazemos',
        title: 'Ensino, Investigação e Demonstração',
        intro: 'O laboratório Digital de Rega apoia',
        items: [
          {
            title: 'Ensino',
            items: [
              { label: 'Aulas práticas', href: '/disciplinas' },
              { label: 'Dissertações e Teses', href: '/dissertacoes' },
              { label: 'Atividades Fab Lab', href: '/fablab' },
              { label: 'Modelos e métodos', href: '/modelos-e-metodos' },
            ],
          },
          {
            title: 'Investigação',
            items: [
              { label: 'Modelos e métodos', href: '/modelos-e-metodos' },
              { label: 'Ferramentas digitais', href: '/ferramentas' },
              { label: 'Fab Lab projetos', href: '/fablab' },
              { label: 'Projetos', href: '/projetos' },
              { label: 'Publicações' },
            ],
          },
          {
            title: 'Demonstração',
            items: [
              { label: 'Ensaios piloto', note: '(Em construção)' },
              { label: 'Dias de campo', note: '(Em construção)' },
              { label: 'Parcerias', note: '(Em construção)' },
            ],
          },
        ],
      },
      fablab: {
        label: 'Fab Lab de Rega',
        title: 'Um espaço de experimentação e prototipagem',
        subtitle: 'A Fab Lab de Rega é onde ideias, sensores, dispositivos e software são montados e testados. Apoia a aprendizagem prática, o desenvolvimento experimental e a construção de protótipos para monitorização e automação da rega.',
        items: ['Montagem de sensores', 'Protótipos IoT', 'Automação de sistemas', 'Testes de campo', 'Aulas práticas'],
        cta: 'Conhecer o Fab Lab',
      },
      tools: {
        label: 'Ferramentas Digitais',
        title: 'Ferramentas digitais desenvolvidas pelo laboratório',
        subtitle: 'Um conjunto de ferramentas para monitorização, calendarização, análise e apoio à decisão na agricultura de regadio.',
        items: [
          { title: 'Dashboard interativo para visualização e acompanhamento de dados hidrogeológicos, climáticos e agrícolas da Zona Vulnerável do Tejo', desc: 'Esta ferramenta reúne, de forma integrada e acessível, informação originalmente dispersa por várias fontes, facilitando a sua consulta, interpretação e utilização por investigadores, técnicos, entidades gestoras e outros stakeholders.', tag: 'Dados' },
          { title: 'Calendarização da Rega', desc: 'Planeamento e otimização dos calendários de rega.', tag: 'Gestão' },
          { title: 'Ferramenta digital para diagnóstico da resiliência em regadios coletivos', desc: 'A ferramenta integrada para cálculo do índice global de resiliência dos Aproveitamentos Hidroagrícolas, que implementa um fluxo completo de avaliação, incluindo o registo dos dados e o cálculo dos indicadores parciais.', tag: 'Análise' },
          { title: 'Visualização Geográfica', desc: 'Mapas e visualização espacial de dados agrícolas.', tag: 'SIG' },
          { title: 'Protótipos de Apoio à Decisão', desc: 'Ferramentas experimentais para suporte à decisão na rega.', tag: 'I&D' },
        ],
        cta: 'Explorar ferramentas',
      },
      projects: {
        label: 'Projetos',
        title: 'Projetos de investigação',
        subtitle: 'Projetos apoiados pelo laboratório digital de rega + Fab Lab de rega.',
        cta: 'Ver projeto',
        items: [
          {
            name: 'HubIS',
            desc: 'Objetivo: favorecer o surgimento, avaliar e impulsionar inovações que visam reduzir o gap de desempenho e melhorar a sustentabilidade dos sistemas de rega na região mediterrânica.',
            tags: ['IoT', 'Integração de Dados'],
          },
          {
            name: 'Clepsydra',
            desc: 'Desenvolvimento de sistema de monitorização de águas subterrâneas e apoio à decisão para otimizar a tomada de decisão em ambientes agrícolas sensíveis e com escassez de água no contexto mediterrânico.',
            tags: ['Modelação', 'Simulação'],
          },
          {
            name: 'Path4Med',
            desc: 'Incorporando práticas agrícolas sustentáveis e tecnologias de monitorização avançadas, o Path4Med visa proteger ecossistemas vitais, melhorar a qualidade da água e capacitar comunidades para criar um futuro livre de poluição.',
            tags: ['Clima', 'Mediterrânico'],
          },
          {
            name: 'WaterQb',
            desc: 'Plataforma web para apoio à gestão da rega visando a convivência com a variabilidade e as alterações climáticas.',
            tags: ['Gestão da Água', 'Apoio à Decisão'],
          },
        ],
      },
      partners: {
        label: 'Colaborações',
        title: 'Colaborações e redes',
        subtitle: 'Colaboração com universidades, centros de investigação, associações de regantes, empresas, agricultores e entidades públicas.',
        types: ['Universidades', 'Centros de Investigação', 'Associações de Regantes', 'Empresas de Tecnologia', 'Agricultores', 'Entidades Públicas'],
      },
      contact: {
        label: 'Contactos',
        title: 'Entre em contacto',
        subtitle: 'Para colaborações, informações ou parcerias, contacte diretamente.',
        cta: 'Enviar mensagem',
        email_label: 'Email',
        location_label: 'Localização',
        location_value: 'Portugal',
      },
      footer: {
        rights: 'Todos os direitos reservados',
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: 'About',
        areas: 'Areas',
        whatwedo: 'What We Do',
        fablab: 'Fab Lab',
        tools: 'Tools',
        projects: 'Projects',
        partners: 'Collaborations',
        contact: 'Contact',
        home: 'Home',
      },
      hero: {
        tag: 'Agriculture 4.0',
        title: 'Digital Irrigation\nLaboratory',
        title_line1: 'IRRIGATION',
        title_line2: 'DIGITAL',
        title_line3: 'LAB',
        subtitle: 'Infrastructure supporting teaching, research, demonstration and prototyping in monitoring, modelling and decision support.',
        cta_primary: 'Explore the Lab',
        cta_secondary: 'View Tools',
        scroll: 'Scroll to explore',
      },
      about: {
        label: 'About us',
        title: 'Digital pedagogical, scientific and technological infrastructure that promotes the integration of theoretical knowledge, practical experimentation, digital innovation and responses to current challenges in irrigated agriculture.',
        text2: 'It integrates an Irrigation Fab Lab, a small workshop where prototypes applied to irrigation management are designed, assembled and tested.',
        stat1_value: '4',
        stat1_label: 'Active Projects',
        stat2_value: '6',
        stat2_label: 'Research Areas',
        stat3_value: '3',
        stat3_label: 'Core Missions',
        quote: 'Design, assemble and test prototypes applied to irrigation management.',
        lines_label: 'Lines of action',
        lines: [
          { key: 'teaching',      val: '' },
          { key: 'research',      val: '' },
          { key: 'demonstration', val: '' },
          { key: 'prototyping',   val: '' },
        ],
      },
      areas: {
        label: 'Activity Areas',
        title: 'What we research',
        subtitle: 'Six areas of knowledge and technology form the core of the digital laboratory.',
        items: [
          { title: 'Irrigation Scheduling', desc: 'Soil, plant and climate — integrated data for more efficient decisions.' },
          { title: 'Sensors & IoT', desc: 'Real-time data for continuous and automated monitoring.' },
          { title: 'Remote Sensing', desc: 'Satellite, drone and imagery for spatial agricultural analysis.' },
          { title: 'Climate Change', desc: 'Resilience and adaptation of irrigation systems to the new climate.' },
          { title: 'Modelling & Decision Support', desc: 'Digital tools for water optimisation and management.' },
          { title: 'Water-Energy NEXUS', desc: 'Integrated efficiency between water and energy resources.' },
        ],
      },
      whatwedo: {
        label: 'What We Do',
        title: 'Teaching, Research and Demonstration',
        intro: 'The Digital Irrigation Laboratory supports',
        items: [
          {
            title: 'Teaching',
            items: [
              { label: 'Practical classes', href: '/disciplinas' },
              { label: 'Dissertations & Theses', href: '/dissertacoes' },
              { label: 'Fab Lab Activities', href: '/fablab' },
              { label: 'Models and methods', href: '/modelos-e-metodos' },
            ],
          },
          {
            title: 'Research',
            items: [
              { label: 'Models and methods', href: '/modelos-e-metodos' },
              { label: 'Digital tools', href: '/ferramentas' },
              { label: 'Fab Lab projects', href: '/fablab' },
              { label: 'Projects', href: '/projetos' },
              { label: 'Publications' },
            ],
          },
          {
            title: 'Demonstration',
            items: [
              { label: 'Pilot trials', note: '(Under construction)' },
              { label: 'Field days', note: '(Under construction)' },
              { label: 'Partnerships', note: '(Under construction)' },
            ],
          },
        ],
      },
      fablab: {
        label: 'Irrigation Fab Lab',
        title: 'A space for experimentation and prototyping',
        subtitle: 'The Irrigation Fab Lab is where ideas, sensors, devices and software are assembled and tested. It supports hands-on learning, experimental development and the construction of prototypes for irrigation monitoring and automation.',
        items: ['Sensor assembly', 'IoT prototypes', 'System automation', 'Field testing', 'Practical classes'],
        cta: 'Learn about the Fab Lab',
      },
      tools: {
        label: 'Digital Tools',
        title: 'Digital tools developed by the laboratory',
        subtitle: 'A set of tools for monitoring, scheduling, analysis and decision support in irrigated agriculture.',
        items: [
          { title: 'Interactive dashboard for visualisation and monitoring of hydrogeological, climate and agricultural data from the Tejo Vulnerable Zone', desc: 'This tool brings together, in an integrated and accessible way, information originally scattered across several sources, making it easier for researchers, technicians, managing entities and other stakeholders to consult, interpret and use it.', tag: 'Data' },
          { title: 'Irrigation Scheduling', desc: 'Planning and optimisation of irrigation schedules.', tag: 'Management' },
          { title: 'Digital tool for diagnosing resilience in collective irrigation schemes', desc: 'The integrated tool for calculating the global resilience index of hydro-agricultural schemes, implementing a complete assessment workflow including data recording and the calculation of partial indicators.', tag: 'Analysis' },
          { title: 'Geographic Visualisation', desc: 'Maps and spatial visualisation of agricultural data.', tag: 'GIS' },
          { title: 'Decision Support Prototypes', desc: 'Experimental tools for irrigation decision support.', tag: 'R&D' },
        ],
        cta: 'Explore tools',
      },
      projects: {
        label: 'Projects',
        title: 'Research projects',
        subtitle: 'Projects supported by the digital irrigation laboratory + Irrigation Fab Lab.',
        cta: 'View project',
        items: [
          {
            name: 'HubIS',
            desc: 'Aim: favour the emergence, evaluate and boost innovations aiming at reducing the performance gap and thus improve the sustainability of irrigation systems in the Mediterranean region.',
            tags: ['IoT', 'Data Integration'],
          },
          {
            name: 'Clepsydra',
            desc: 'Groundwater monitoring & decision support system development to optimise decision making in sensitive and water-scarce agricultural environments in Mediterranean context.',
            tags: ['Modelling', 'Simulation'],
          },
          {
            name: 'Path4Med',
            desc: 'By incorporating sustainable agricultural practices and advanced monitoring technologies, Path4Med aims to protect vital ecosystems, improve water quality and empower communities to create a pollution-free future.',
            tags: ['Climate', 'Mediterranean'],
          },
          {
            name: 'WaterQb',
            desc: 'Web platform for irrigation management support aimed at coexisting with climate variability and change.',
            tags: ['Water Management', 'Decision Support'],
          },
        ],
      },
      partners: {
        label: 'Collaborations',
        title: 'Collaborations and networks',
        subtitle: 'Collaboration with universities, research centres, irrigation associations, companies, farmers and public entities.',
        types: ['Universities', 'Research Centres', 'Irrigation Associations', 'Technology Companies', 'Farmers', 'Public Entities'],
      },
      contact: {
        label: 'Contact',
        title: 'Get in touch',
        subtitle: 'For collaborations, information or partnerships, please get in touch directly.',
        cta: 'Send message',
        email_label: 'Email',
        location_label: 'Location',
        location_value: 'Portugal',
      },
      footer: {
        rights: 'All rights reserved',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
  })

export default i18n
