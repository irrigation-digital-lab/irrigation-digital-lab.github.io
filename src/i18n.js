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
        partners: 'Parcerias',
        contact: 'Contactos',
      },
      hero: {
        tag: 'Agricultura 4.0',
        title: 'Laboratório Digital\nde Rega',
        subtitle: 'Infraestrutura de ensino, investigação, demonstração e prototipagem dedicada ao desenvolvimento de soluções inovadoras para a monitorização, modelação e apoio à decisão em agricultura de regadio.',
        cta_primary: 'Explorar o Laboratório',
        cta_secondary: 'Ver Ferramentas',
        scroll: 'Scroll',
      },
      about: {
        label: 'Sobre nós',
        title: 'Uma infraestrutura ao serviço da inovação agrícola',
        text1: 'O Laboratório Digital de Rega é uma infraestrutura de ensino, investigação, demonstração e prototipagem dedicada ao desenvolvimento de soluções inovadoras para a monitorização, modelação e apoio à decisão em agricultura de regadio.',
        text2: 'Integra uma Fab Lab de Rega que reforça a capacidade de experimentação tecnológica, permitindo conceber, montar e testar protótipos aplicados à gestão da rega.',
        stat1_value: '4',
        stat1_label: 'Projetos Ativos',
        stat2_value: '8',
        stat2_label: 'Áreas de Investigação',
        stat3_value: '3',
        stat3_label: 'Missões Principais',
        quote: 'Conceber, montar e testar protótipos aplicados à gestão da rega.',
      },
      areas: {
        label: 'Áreas de Atividade',
        title: 'O que investigamos e desenvolvemos',
        subtitle: 'Oito áreas de conhecimento e tecnologia que formam o núcleo do laboratório.',
        items: [
          { title: 'Rega de Precisão', desc: 'Solo, planta e clima — dados integrados para decisões mais eficientes.' },
          { title: 'Sensores e IoT', desc: 'Dados em tempo real para monitorização contínua e automatizada.' },
          { title: 'Teledeteção', desc: 'Satélite, drone e imagens para análise espacial da agricultura.' },
          { title: 'Alterações Climáticas', desc: 'Resiliência e adaptação dos sistemas de rega ao novo clima.' },
          { title: 'Modelação e Apoio à Decisão', desc: 'Ferramentas digitais para otimização e gestão hídrica.' },
          { title: 'NEXUS Água-Energia', desc: 'Eficiência integrada entre recursos hídricos e energéticos.' },
          { title: 'Fab Lab de Rega', desc: 'Prototipagem e testes de soluções inovadoras no laboratório.' },
          { title: 'Demonstração Tecnológica', desc: 'Ligação a stakeholders e transferência de conhecimento.' },
        ],
      },
      whatwedo: {
        label: 'O que Fazemos',
        title: 'Três pilares de atuação',
        items: [
          {
            title: 'Ensino',
            items: ['Aulas práticas', 'Estágios', 'Dissertações e Teses', 'Atividades Fab Lab'],
          },
          {
            title: 'Investigação',
            items: ['Modelos e métodos', 'Ferramentas digitais', 'Prototipagem aplicada à rega'],
          },
          {
            title: 'Demonstração',
            items: ['Ensaios piloto', 'Dias de campo', 'Parcerias tecnológicas'],
          },
        ],
      },
      fablab: {
        label: 'Fab Lab de Rega',
        title: 'Prototipar para inovar',
        subtitle: 'A Fab Lab de Rega é o espaço onde ideias, sensores, dispositivos e soluções digitais ganham forma. Apoia o desenvolvimento experimental, a aprendizagem prática e a criação de protótipos para monitorização e automação da rega.',
        items: ['Montagem de sensores', 'Protótipos IoT', 'Automação de sistemas', 'Testes de campo', 'Aulas práticas'],
        cta: 'Conhecer o Fab Lab',
      },
      tools: {
        label: 'Ferramentas Digitais',
        title: 'Soluções para a gestão da rega',
        subtitle: 'Ferramentas digitais desenvolvidas e disponibilizadas pelo laboratório.',
        items: [
          { title: 'Dashboard de Monitorização', desc: 'Visualização em tempo real de dados de campo.', tag: 'Dados' },
          { title: 'Calendarização da Rega', desc: 'Planeamento e otimização dos calendários de rega.', tag: 'Gestão' },
          { title: 'Avaliação Hídrica', desc: 'Análise e avaliação das necessidades hídricas das culturas.', tag: 'Análise' },
          { title: 'Visualização Geográfica', desc: 'Mapas e visualização espacial de dados agrícolas.', tag: 'SIG' },
          { title: 'Protótipos de Apoio à Decisão', desc: 'Ferramentas experimentais para suporte à decisão na rega.', tag: 'I&D' },
        ],
        cta: 'Explorar ferramentas',
      },
      projects: {
        label: 'Projetos',
        title: 'Investigação em destaque',
        subtitle: 'Projetos de investigação desenvolvidos pelo laboratório.',
        cta: 'Ver projeto',
      },
      partners: {
        label: 'Parcerias',
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
        partners: 'Partners',
        contact: 'Contact',
      },
      hero: {
        tag: 'Agriculture 4.0',
        title: 'Digital Irrigation\nLaboratory',
        subtitle: 'An infrastructure for teaching, research, demonstration and prototyping dedicated to developing innovative solutions for monitoring, modelling and decision support in irrigated agriculture.',
        cta_primary: 'Explore the Lab',
        cta_secondary: 'View Tools',
        scroll: 'Scroll',
      },
      about: {
        label: 'About us',
        title: 'An infrastructure at the service of agricultural innovation',
        text1: 'The Digital Irrigation Laboratory is an infrastructure for teaching, research, demonstration and prototyping dedicated to developing innovative solutions for monitoring, modelling and decision support in irrigated agriculture.',
        text2: 'It integrates an Irrigation Fab Lab that reinforces technological experimentation capabilities, enabling the design, assembly and testing of prototypes applied to irrigation management.',
        stat1_value: '4',
        stat1_label: 'Active Projects',
        stat2_value: '8',
        stat2_label: 'Research Areas',
        stat3_value: '3',
        stat3_label: 'Core Missions',
        quote: 'Design, assemble and test prototypes applied to irrigation management.',
      },
      areas: {
        label: 'Activity Areas',
        title: 'What we research and develop',
        subtitle: 'Eight areas of knowledge and technology that form the core of the laboratory.',
        items: [
          { title: 'Precision Irrigation', desc: 'Soil, plant and climate — integrated data for more efficient decisions.' },
          { title: 'Sensors & IoT', desc: 'Real-time data for continuous and automated monitoring.' },
          { title: 'Remote Sensing', desc: 'Satellite, drone and imagery for spatial agricultural analysis.' },
          { title: 'Climate Change', desc: 'Resilience and adaptation of irrigation systems to the new climate.' },
          { title: 'Modelling & Decision Support', desc: 'Digital tools for water optimisation and management.' },
          { title: 'Water-Energy NEXUS', desc: 'Integrated efficiency between water and energy resources.' },
          { title: 'Irrigation Fab Lab', desc: 'Prototyping and testing of innovative solutions in the laboratory.' },
          { title: 'Technology Demonstration', desc: 'Stakeholder engagement and knowledge transfer.' },
        ],
      },
      whatwedo: {
        label: 'What We Do',
        title: 'Three pillars of action',
        items: [
          {
            title: 'Teaching',
            items: ['Practical classes', 'Internships', 'Dissertations & Theses', 'Fab Lab Activities'],
          },
          {
            title: 'Research',
            items: ['Models and methods', 'Digital tools', 'Prototyping applied to irrigation'],
          },
          {
            title: 'Demonstration',
            items: ['Pilot trials', 'Field days', 'Technology partnerships'],
          },
        ],
      },
      fablab: {
        label: 'Irrigation Fab Lab',
        title: 'Prototype to innovate',
        subtitle: 'The Irrigation Fab Lab is the space where ideas, sensors, devices and digital solutions take shape. It supports experimental development, hands-on learning and the creation of prototypes for irrigation monitoring and automation.',
        items: ['Sensor assembly', 'IoT prototypes', 'System automation', 'Field testing', 'Practical classes'],
        cta: 'Learn about the Fab Lab',
      },
      tools: {
        label: 'Digital Tools',
        title: 'Solutions for irrigation management',
        subtitle: 'Digital tools developed and made available by the laboratory.',
        items: [
          { title: 'Monitoring Dashboard', desc: 'Real-time visualisation of field data.', tag: 'Data' },
          { title: 'Irrigation Scheduling', desc: 'Planning and optimisation of irrigation schedules.', tag: 'Management' },
          { title: 'Water Assessment', desc: 'Analysis and evaluation of crop water requirements.', tag: 'Analysis' },
          { title: 'Geographic Visualisation', desc: 'Maps and spatial visualisation of agricultural data.', tag: 'GIS' },
          { title: 'Decision Support Prototypes', desc: 'Experimental tools for irrigation decision support.', tag: 'R&D' },
        ],
        cta: 'Explore tools',
      },
      projects: {
        label: 'Projects',
        title: 'Featured research',
        subtitle: 'Research projects developed by the laboratory.',
        cta: 'View project',
      },
      partners: {
        label: 'Partners',
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
