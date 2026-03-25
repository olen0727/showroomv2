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

export const otherProjects: IOtherProject[] = [
  {
    id: 'other01',
    name: '法國皇家LineLIFF會員平台',
    description: 'A customizable daily productivity dashboard focusing on task management, habit tracking, and insightful data visualization.',
    image: '/projects/otherprojects/Protfolio2025_01.png',
  },
  {
    id: 'other02',
    name: '第一銀行薪轉戶專區',
    description: 'A robust and scalable UI component library built specifically for modern e-commerce storefronts under high traffic.',
    image: '/projects/otherprojects/Protfolio2025_38.png',
  },
  {
    id: 'other03',
    name: 'AI Writing Assistant',
    description: 'An AI-powered application designed to help writers overcome blocks and refine their narrative structures using LLM.',
    image: '/projects/otherprojects/Protfolio2025_39.png',
  },
  {
    id: 'other04',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_40.png',
  },
  {
    id: 'other05',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_05.png',
  },
  {
    id: 'other06',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_06.png',
  },
  {
    id: 'other07',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_07.png',
  },
  {
    id: 'other08',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_08.png',
  },
  {
    id: 'other09',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_09.png',
  },
  {
    id: 'other10',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_10.png',
  },
  {
    id: 'other11',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_11.png',
  },
  {
    id: 'other12',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_12.png',
  },
  {
    id: 'other13',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_13.png',
  },
  {
    id: 'other14',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_14.png',
  },
  {
    id: 'other15',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_15.png',
  },
  {
    id: 'other16',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_16.png',
  },
  {
    id: 'other17',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_17.png',
  },
  {
    id: 'other18',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_18.png',
  },
  {
    id: 'other19',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_19.png',
  },
  {
    id: 'other20',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_20.png',
  },
  {
    id: 'other21',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_21.png',
  },
  {
    id: 'other22',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_22.png',
  },
  {
    id: 'other23',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_23.png',
  },
  {
    id: 'other24',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_24.png',
  },
  {
    id: 'other25',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_25.png',
  },
  {
    id: 'other26',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_26.png',
  },
  {
    id: 'other27',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_27.png',
  },
  {
    id: 'other28',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_28.png',
  },
  {
    id: 'other29',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_29.png',
  },
  {
    id: 'other30',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_30.png',
  },
  {
    id: 'other31',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_31.png',
  },
  {
    id: 'other32',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/Protfolio2025_32.png',
  },
];
