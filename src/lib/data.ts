export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

export interface Bonus {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'audio' | 'checklist';
  downloadUrl: string;
}

export const modules: Module[] = [
  {
    id: '1',
    title: 'Fundamentos da Respiração',
    description: 'Aprenda os pilares essenciais da respiração correta e mecânica ventilatória',
    progress: 0,
    lessons: [
      {
        id: '1-1',
        title: 'Introdução ao Treinamento Respiratório',
        duration: '12:30',
        videoUrl: 'https://example.com/video1',
        description: 'Entenda a importância da respiração correta para sua saúde',
        completed: false
      },
      {
        id: '1-2',
        title: 'Anatomia do Sistema Respiratório',
        duration: '15:45',
        videoUrl: 'https://example.com/video2',
        description: 'Conheça os músculos e estruturas envolvidas na respiração',
        completed: false
      },
      {
        id: '1-3',
        title: 'Mecânica Ventilatória Ideal',
        duration: '18:20',
        videoUrl: 'https://example.com/video3',
        description: 'Aprenda como funciona a mecânica correta da respiração',
        completed: false
      },
      {
        id: '1-4',
        title: 'Avaliação da Sua Respiração Atual',
        duration: '10:15',
        videoUrl: 'https://example.com/video4',
        description: 'Identifique padrões respiratórios inadequados',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Exercícios Básicos',
    description: 'Pratique exercícios fundamentais para ativar os músculos respiratórios',
    progress: 0,
    lessons: [
      {
        id: '2-1',
        title: 'Respiração Diafragmática',
        duration: '14:30',
        videoUrl: 'https://example.com/video5',
        description: 'Domine a técnica de respiração pelo diafragma',
        completed: false
      },
      {
        id: '2-2',
        title: 'Expansão Torácica',
        duration: '16:45',
        videoUrl: 'https://example.com/video6',
        description: 'Aprenda a expandir corretamente a caixa torácica',
        completed: false
      },
      {
        id: '2-3',
        title: 'Controle do Ritmo Respiratório',
        duration: '12:20',
        videoUrl: 'https://example.com/video7',
        description: 'Desenvolva controle sobre seu ritmo de respiração',
        completed: false
      },
      {
        id: '2-4',
        title: 'Exercícios de Fortalecimento Inicial',
        duration: '20:10',
        videoUrl: 'https://example.com/video8',
        description: 'Fortaleça os músculos respiratórios com exercícios básicos',
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'Técnicas Intermediárias',
    description: 'Avance para técnicas mais elaboradas de condicionamento respiratório',
    progress: 0,
    lessons: [
      {
        id: '3-1',
        title: 'Respiração Coordenada',
        duration: '17:30',
        videoUrl: 'https://example.com/video9',
        description: 'Sincronize diferentes grupos musculares na respiração',
        completed: false
      },
      {
        id: '3-2',
        title: 'Aumento da Capacidade Pulmonar',
        duration: '19:45',
        videoUrl: 'https://example.com/video10',
        description: 'Exercícios para expandir sua capacidade pulmonar',
        completed: false
      },
      {
        id: '3-3',
        title: 'Respiração Durante Atividades',
        duration: '15:20',
        videoUrl: 'https://example.com/video11',
        description: 'Aprenda a respirar corretamente durante movimentos',
        completed: false
      },
      {
        id: '3-4',
        title: 'Técnicas de Recuperação Respiratória',
        duration: '13:50',
        videoUrl: 'https://example.com/video12',
        description: 'Recupere o fôlego rapidamente após esforço',
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'Treinamento Avançado',
    description: 'Domine técnicas avançadas para máximo desempenho respiratório',
    progress: 0,
    lessons: [
      {
        id: '4-1',
        title: 'Respiração de Alta Performance',
        duration: '22:30',
        videoUrl: 'https://example.com/video13',
        description: 'Técnicas utilizadas por atletas de elite',
        completed: false
      },
      {
        id: '4-2',
        title: 'Condicionamento Respiratório Intenso',
        duration: '25:45',
        videoUrl: 'https://example.com/video14',
        description: 'Leve seu condicionamento ao próximo nível',
        completed: false
      },
      {
        id: '4-3',
        title: 'Respiração em Situações de Estresse',
        duration: '18:20',
        videoUrl: 'https://example.com/video15',
        description: 'Mantenha o controle respiratório sob pressão',
        completed: false
      },
      {
        id: '4-4',
        title: 'Integração Total - Respiração no Dia a Dia',
        duration: '20:10',
        videoUrl: 'https://example.com/video16',
        description: 'Incorpore a respiração correta em todas as atividades',
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'Reabilitação Respiratória',
    description: 'Protocolos específicos para recuperação e reabilitação pulmonar',
    progress: 0,
    lessons: [
      {
        id: '5-1',
        title: 'Protocolo de Reabilitação Pós-COVID',
        duration: '24:30',
        videoUrl: 'https://example.com/video17',
        description: 'Recupere sua capacidade respiratória após COVID-19',
        completed: false
      },
      {
        id: '5-2',
        title: 'Exercícios para Doenças Crônicas',
        duration: '21:45',
        videoUrl: 'https://example.com/video18',
        description: 'Adaptações para condições respiratórias crônicas',
        completed: false
      },
      {
        id: '5-3',
        title: 'Manejo de Crises Respiratórias',
        duration: '16:20',
        videoUrl: 'https://example.com/video19',
        description: 'Técnicas para controlar e prevenir crises',
        completed: false
      },
      {
        id: '5-4',
        title: 'Plano de Manutenção a Longo Prazo',
        duration: '19:50',
        videoUrl: 'https://example.com/video20',
        description: 'Mantenha os resultados conquistados',
        completed: false
      }
    ]
  }
];

export const bonuses: Bonus[] = [
  {
    id: 'b1',
    title: 'Guia Completo de Posturas para Melhorar a Respiração',
    description: 'Aprenda as melhores posturas para otimizar sua respiração no dia a dia',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b2',
    title: 'Alimentação Anti-Inflamatória para Saúde Pulmonar',
    description: 'Descubra os alimentos que fortalecem seus pulmões',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b3',
    title: 'Técnicas de Respiração para Alívio Imediato da Ansiedade',
    description: 'Controle a ansiedade através da respiração consciente',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b4',
    title: 'Fortalecimento Muscular Respiratório para Atletas',
    description: 'Maximize seu desempenho esportivo com respiração otimizada',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b5',
    title: 'Manual de Recuperação Pulmonar Pós-COVID',
    description: 'Protocolo completo de recuperação respiratória',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b6',
    title: 'Como Prevenir Crises de Asma e Brônquite no Dia a Dia',
    description: 'Estratégias práticas para prevenir crises respiratórias',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b7',
    title: 'Programa de Alongamentos para Expansão Pulmonar',
    description: 'Alongamentos específicos para aumentar capacidade pulmonar',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b8',
    title: 'Guia da Respiração Consciente para Melhorar o Sono',
    description: 'Durma melhor com técnicas de respiração noturna',
    type: 'ebook',
    downloadUrl: '#'
  },
  {
    id: 'b9',
    title: 'Meditações Guiadas',
    description: 'Áudios de meditação focados em respiração e relaxamento',
    type: 'audio',
    downloadUrl: '#'
  },
  {
    id: 'b10',
    title: 'Checklist Diário de Hábitos para Pulmões Saudáveis',
    description: 'Acompanhe seus hábitos diários para saúde respiratória',
    type: 'checklist',
    downloadUrl: '#'
  }
];
