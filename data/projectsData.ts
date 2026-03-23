export interface ICaseStudy {
  id: string;
  name: string;
  description: string;
  imagesFolder: string;
  imagesCount: number;
}

export interface ISideProject {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface IOtherProject {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const caseStudies: ICaseStudy[] = [
  {
    id: 'case01',
    name: '國泰金控採購平台 UX 改造專案',
    description: '透過全新的 UX 設計與流程優化，全面提升企業內部採購效率，簡化繁瑣的簽核流程，並提供清晰直觀的數據面板以輔助決策。',
    imagesFolder: '/projects/case01/國泰金控採購平台 UX 改造專案_',
    imagesCount: 10,
  },
  {
    id: 'case02',
    name: 'Project A02',
    description: 'This is another placeholder for case study. Future project will be placed here.',
    imagesFolder: '/projects/case02/case02_',
    imagesCount: 0,
  }
];

export const sideProjects: ISideProject[] = [
  {
    id: 'side01',
    name: 'Personal Dashboard',
    description: 'A customizable daily productivity dashboard focusing on task management, habit tracking, and insightful data visualization.',
    image: '/projects/sideprojects/side01.png',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://example.com/side01',
    github: 'https://github.com/example/side01'
  },
  {
    id: 'side02',
    name: 'E-commerce UI Kit',
    description: 'A robust and scalable UI component library built specifically for modern e-commerce storefronts under high traffic.',
    image: '/projects/sideprojects/side02.png',
    tags: ['Vue.js', 'SCSS', 'Storybook'],
  },
  {
    id: 'side03',
    name: 'AI Writing Assistant',
    description: 'An AI-powered application designed to help writers overcome blocks and refine their narrative structures using LLM.',
    image: '/projects/sideprojects/side03.png',
    tags: ['Next.js', 'OpenAI API', 'Framer Motion'],
  },
  {
    id: 'side04',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/sideprojects/side04.png',
    tags: ['React Native', 'Firebase', 'Redux'],
    link: 'https://example.com/side04',
  }
];

export const otherProjects: IOtherProject[] = Array.from({ length: 36 }).map((_, i) => ({
  id: `other${i + 1}`,
  name: `Gallery Project ${String(i + 1).padStart(2, '0')}`,
  description: `Exploring creative layouts and interaction patterns in project ${i + 1}. A brief snapshot of experimental design and frontend logic.`,
  image: `/projects/otherprojects/Protfolio2025_${String(i + 1).padStart(2, '0')}.png`
}));
