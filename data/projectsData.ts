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
  tags: string[];
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
    name: 'secKernel',
    description: '集成了筆記、任務管理、習慣追蹤以及網頁內容擷取的個人知識管理系統 (PKM)。專案採用 Offline-First 架構設計，確保資料在無網路狀態下仍可操作，並透過 CouchDB 進行多端同步。',
    image: '/projects/sideprojects/side01.png',
    tags: ['Offline-First架構與跨端同步 (Local-First Architecture)', 'RxDB x CouchDB', '自動化網頁內容萃取(Web Content Scraping)', 'Docker', 'React', 'Tiptap', 'Python', 'GCP'],
    link: 'https://www.seckernel.com/',
    github: 'https://github.com/olen0727/myKernel'
  },
  {
    id: 'side02',
    name: 'jobRadar-求職雷達',
    description: 'JobRadar AI 是一款Chrome 擴充功能，專為現代求職者打造的「職缺分析與管理儀表板」。透過自動抓取主流求職平台（如 104、LinkedIn）的職缺內容，並結合主流三大大語言模型，系統能針對使用者的履歷進行深度的契合度分析（包含優缺點剖析與自動通勤時間估值）。專案採用 Local-First (本地優先) 架構，確保用戶資料隱私的同時，也透過 Supabase Edge Functions 提供流暢的免登入試用體驗，大幅提升求職效率與決策品質。',
    image: '/projects/sideprojects/side02.png',
    tags: ['Local-First 與隱私優先架構 (Zero-Backend)', '跨平台 DOM 爬蟲與智慧資料抽離', '多模組 AI 架構與token成本估算系統', 'React', 'Vite', 'Python', 'Supabase'],
    link: 'https://chromewebstore.google.com/detail/jobradar-ai/jckoknglgmoepibbnbgebfpalbpkdnnh',
    github: 'https://github.com/olen0727/jobRadar'
  },
  {
    id: 'side03',
    name: 'chiliClawer',
    description: '整合「全自動化爬蟲」與「前端資料視覺化」的 Web 應用程式。專案旨在每天自動抓取並分析「臺北農產運銷公司」的蔬菜交易數據（包含價格走勢與交易量），並透過現代化的互動式儀表板，提供使用者多維度（依市場、品項、品種、時間區間）的市場趨勢洞察。',
    image: '/projects/sideprojects/side03.png',
    tags: ['全自動化資料Pipeline與CI/CD', 'Serverless', '資料視覺化', 'Web Scraping', 'Next.js', 'Python'],
    link: 'https://chilicrawler.olean.com.tw/',
    github: 'https://github.com/olen0727/chiliPriceDataCrawler'
  },
  {
    id: 'side04',
    name: 'promptManager',
    description: 'PromptManager 是一款專為 AI 繪圖與大型語言模型開發者設計的Prompt管理系統。該平台旨在解決複雜指令難以維護與重複使用的痛點，提供動態變數模板、即時預覽、自動化精準複製及雲端跨裝置同步等功能。透過直覺的視覺化介面，大幅提升使用者在設計、測試與迭代 AI 指令時的工作效率。',
    image: '/projects/sideprojects/side04.png',
    tags: ['動態變數模板', '即時雙向綁定預覽', 'tRPC', 'Next.js', 'Supabase'],
    link: 'https://prompt.olean.com.tw/',
    github: 'https://github.com/olen0727/promptManager'
  }
];

export const otherProjects: IOtherProject[] = [
  {
    id: 'other01',
    name: '法國皇家LineLIFF會員平台',
    description: '為法國皇家設計的 LineLIFF Mini App 會員平台，整合會員註冊、登入、訂單查詢、積分兌換等功能。',
    image: '/projects/otherprojects/other_pic_4.png',
    tags: ['需求訪談', '用戶研究', '流程設計', '資訊架構', '介面布局設計'],
  },
  {
    id: 'other02',
    name: '遠東百貨FEDAPP',
    description: '為遠東百貨設計的FEDAPP，提供會員專屬的服務與優惠。',
    image: '/projects/otherprojects/other_pic_6.png',
    tags: ['需求訪談', '用戶研究', '流程設計', '資訊架構', '介面布局設計'],
  },
  {
    id: 'other03',
    name: '第一銀行薪轉戶專區',
    description: '為第一銀行設計的薪轉戶專區，提供薪轉戶專屬的金融服務與優惠。',
    image: '/projects/otherprojects/other_pic_7.png',
    tags: ['需求訪談', '用戶研究', '流程設計', '資訊架構', '介面布局設計'],
  },
  {
    id: 'other04',
    name: 'QbiAI人工智能客服訂閱網站',
    description: '人工智能客服訂閱網站，提供訂閱、訓練資料上傳、LINE介面設定等後台管理功能。',
    image: '/projects/otherprojects/other_pic_8.png',
    tags: ['功能開發', 'API串接', '專案管理', '文件轉譯'],
  },
  {
    id: 'other05',
    name: '桃園市政府景點ARVR虛擬導覽',
    description: '桃園市政府景點ARVR虛擬導覽，提供景點導覽、AR互動、VR體驗等功能。',
    image: '/projects/otherprojects/other_pic_9.png',
    tags: ['網站開發', 'ARVR', '互動設計', 'Angular'],
  },
  {
    id: 'other06',
    name: '台北市政府-4D城市儀表板',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_10.png',
    tags: ['網站開發', '資料視覺化', '互動設計', 'Three.js', 'UI/UX'],
  },
  {
    id: 'other07',
    name: '台中科博館-科學節專題網站',
    description: '第一屆科學節專題網站，提供科學節相關資訊、活動查詢、展覽介紹、AR導覽等功能。',
    image: '/projects/otherprojects/other_pic_11.png',
    tags: ['網站開發', 'AR', '互動設計', 'Vue', '多語系', 'UI/UX'],
  },
  {
    id: 'other08',
    name: '富邦金控-形象官網',
    description: '富邦金控形象官網改版，提供金控品牌資訊、ESG永續資訊、投資人專區等功能。',
    image: '/projects/otherprojects/other_pic_12.png',
    tags: ['需求訪談', '用戶研究', '介面布局設計', '資訊架構重整',],
  },
  {
    id: 'other09',
    name: '富邦-Run For Green專題網站',
    description: 'Run For Green專題網站，闡述願景、理念，並呼籲行動。',
    image: '/projects/otherprojects/other_pic_13.png',
    tags: ['網站開發', '互動設計', '介面布局設計'],
  },
  {
    id: 'other10',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_14.png',
  },
  {
    id: 'other11',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_15.png',
  },
  {
    id: 'other12',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_16.png',
  },
  {
    id: 'other13',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_17.png',
  },
  {
    id: 'other14',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_18.png',
  },
  {
    id: 'other15',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_19.png',
  },
  {
    id: 'other16',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_20.png',
  },
  {
    id: 'other17',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_21.png',
  },
  {
    id: 'other18',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_22.png',
  },
  {
    id: 'other19',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_23.png',
  },
  {
    id: 'other20',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_24.png',
  },
  {
    id: 'other21',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_25.png',
  },
  {
    id: 'other22',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_26.png',
  },
  {
    id: 'other23',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_27.png',
  },
  {
    id: 'other24',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_28.png',
  },
  {
    id: 'other25',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_29.png',
  },
  {
    id: 'other26',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_30.png',
  },
  {
    id: 'other27',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_31.png',
  },
  {
    id: 'other28',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_32.png',
  },
  {
    id: 'other29',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_33.png',
  },
  {
    id: 'other30',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_34.png',
  },
  {
    id: 'other31',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_35.png',
  },
  {
    id: 'other32',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_36.png',
  },
  {
    id: 'other33',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_37.png',
  },
  {
    id: 'other34',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_38.png',
  },
  {
    id: 'other35',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_39.png',
  },
  {
    id: 'other36',
    name: 'Crypto Portfolio Tracker',
    description: 'A secure mobile app to track multiple crypto wallets to show real-time profit and loss metrics with beautiful charts.',
    image: '/projects/otherprojects/other_pic_40.png',
  },
];
