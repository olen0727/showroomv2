export interface ICaseStudy {
  id: string;
  name: string;
  description: string;
  imagesFolder: string;
  imagesCount: number;
  padZero?: boolean;
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
    name: '一個專案，七個甲方，你聽過明星大亂鬥嗎？',
    description: '一套系統馴服七頭怪獸，從「誰都不滿意」到「88% 滿意度」的求生記',
    imagesFolder: '/projects/case01/tree_',
    imagesCount: 10,
  },
  {
    id: 'case02',
    name: '貓飼料一個月買一次，怎麼讓飼主每天來找你？',
    description: '用一張發票和一堆可愛貓貓照片，把低頻消費做成日常習慣',
    imagesFolder: '/projects/case02/rc_',
    imagesCount: 12,
    padZero: false,
  },
  {
    id: 'case03',
    name: '沒有商品、沒有商家、沒有消費者，然後呢？',
    description: '五十趟漁村、六周建置、帶領一群連電腦都不太會用的漁民，把魚賣上網',
    imagesFolder: '/projects/case03/fish_',
    imagesCount: 14,
    padZero: false,
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
    name: '富邦-Run For Green植樹網站',
    description: '結合馬拉松賽事與綠色永續理念的植樹計畫網站，提供跑者領樹與線上查詢植樹進度等功能。',
    image: '/projects/otherprojects/other_pic_14.png',
    tags: ['網站開發', '前端框架', '互動設計'],
  },
  {
    id: 'other11',
    name: '全球人壽-保戶專區',
    description: '提供全球人壽保戶專屬的線上服務專區，包含保單資訊查詢、繳費、變更、借款與理賠等一站式服務。',
    image: '/projects/otherprojects/other_pic_15.png',
    tags: ['網站開發', 'UI設計', 'API串接'],
  },
  {
    id: 'other12',
    name: 'GUCCI-Garden原典特展活動網站',
    description: 'GUCCI Garden TAIPEI 展覽專屬活動網站，提供各展區(如時空控制室、好戲登場等)詳細介紹及線上預約功能。',
    image: '/projects/otherprojects/other_pic_16.png',
    tags: ['活動網站', '動態展演', '預約系統', 'UI/UX'],
  },
  {
    id: 'other13',
    name: 'AC GEARS-電子商務網站',
    description: 'AC GEARS 的線上購物商城，提供各類電子產品與設計小物的電商購物體驗及流暢的結帳流程。',
    image: '/projects/otherprojects/other_pic_17.png',
    tags: ['電商平台', '前端開發', '購物車系統'],
  },
  {
    id: 'other14',
    name: 'eTireGo-易胎購電子商務平台',
    description: '提供機車族群方便尋找白牌速克達與輕檔車用胎的電商平台，具備依車款與輪胎尺寸多條件篩選功能。',
    image: '/projects/otherprojects/other_pic_18.png',
    tags: ['電商平台', '條件篩選', '前端開發'],
  },
  {
    id: 'other15',
    name: '研揚科技 AAEON eShop',
    description: '為全球工業電腦領導廠商研揚科技打造的 B2B/B2C 電商平台，提供嵌入式板卡與系統等工業產品的線上採購。',
    image: '/projects/otherprojects/other_pic_19.png',
    tags: ['電子商務', 'B2B', '前端開發'],
  },
  {
    id: 'other16',
    name: '好運 HOWIN 官方購物網',
    description: '結合石碇財神廟文創與開運商品的電子商務網站，提供線上選購開運配飾與宗教商品的便利體驗。',
    image: '/projects/otherprojects/other_pic_20.png',
    tags: ['電子商務', '文創商品', '前端開發'],
  },
  {
    id: 'other17',
    name: '宜康健康購 HEALTH',
    description: '專為保健食品與日常保健用品設計的線上購物平台，提供優惠折扣與會員購買流程。',
    image: '/projects/otherprojects/other_pic_21.png',
    tags: ['電子商務', '保健食品', '前端開發'],
  },
  {
    id: 'other18',
    name: 'Fínture 戶外選物探險',
    description: '提供戶外選物、小團探險與私人訂製行程的戶外運動電商平台，介面強調大自然與冒險精神。',
    image: '/projects/otherprojects/other_pic_22.png',
    tags: ['電子商務', '活動報名', '前端開發'],
  },
  {
    id: 'other19',
    name: 'WISH CREATIVE DESIGN',
    description: '設計公司 Wish Creative Design 的企業形象官網，展現公司團隊、創新理念與歷年精彩作品集。',
    image: '/projects/otherprojects/other_pic_23.png',
    tags: ['企業形象網', '視覺設計', '前端開發'],
  },
  {
    id: 'other20',
    name: 'USELECT 數位媒體顧問媒合平台',
    description: '提供業主尋找與篩選合適的數位媒體行銷顧問的媒合系統，透過評價機制建立信任感。',
    image: '/projects/otherprojects/other_pic_24.png',
    tags: ['平台開發', '媒合系統', '前端開發'],
  },
  {
    id: 'other21',
    name: 'Buyippee 買+易',
    description: '全球代購代運服務平台，提供海外購物集運，以及多國地址管理、會員包裹追蹤系統。',
    image: '/projects/otherprojects/other_pic_25.png',
    tags: ['物流平台', '代購代運', '系統開發'],
  },
  {
    id: 'other22',
    name: '天母之塾 (天母の塾)',
    description: '為日本學子在台設立的專屬補習班品牌官網，提供課程資訊、教學特色及入學流程介紹。',
    image: '/projects/otherprojects/other_pic_26.png',
    tags: ['教育網站', '品牌形象', '前端設計'],
  },
  {
    id: 'other23',
    name: '看得見的希望 視障就業平台',
    description: '專為視障人士設計的就業輔導與資源分享平台，提升無障礙網頁體驗，協助視障朋友媒合職缺。',
    image: '/projects/otherprojects/other_pic_27.png',
    tags: ['公益平台', '無障礙設計', '前端開發'],
  },
  {
    id: 'other24',
    name: '中華國際會議展覽協會',
    description: 'Taiwan Convention & Exhibition Association 官方網站，提供協會動態、焦點訊息與會員專區。',
    image: '/projects/otherprojects/other_pic_28.png',
    tags: ['公協會網站', '資訊平台', '前端開發'],
  },
  {
    id: 'other25',
    name: '帝汎國際數位媒體',
    description: 'Diva Digital Media 企業形象官網，展示網紅經紀、影音製作與數位媒體行銷等服務及成效排名。',
    image: '/projects/otherprojects/other_pic_29.png',
    tags: ['企業形象網', '網紅經紀', '前端開發'],
  },
  {
    id: 'other26',
    name: '桂冠協作平台 Laurel Sites',
    description: '專為桂冠企業開發的內部業務與行銷數據協作儀表板，整合業績、銷量圖表與會員群組管理。',
    image: '/projects/otherprojects/other_pic_30.png',
    tags: ['企業內部系統', '數據可視化', 'Dashboard'],
  },
  {
    id: 'other27',
    name: '中華電信 iEN 智慧節能服務',
    description: '整合 IoT 設備數據的節能管理介面，提供用電量報表、設備狀態監控及路燈/平板燈遠端管理功能。',
    image: '/projects/otherprojects/other_pic_31.png',
    tags: ['物聯網', '數據報表', '企業平台'],
  },
  {
    id: 'other28',
    name: 'RHYTHM ALLEY 響巷',
    description: '結合音樂、舞蹈及表演藝術的品牌網站，提供職人課程報名、展演活動資訊與藝企合作說明。',
    image: '/projects/otherprojects/other_pic_32.png',
    tags: ['藝文企劃', '活動報名', '前端開發'],
  },
  {
    id: 'other29',
    name: '林彥斌醫師 個人形象網站',
    description: '整形外科醫師個人專業形象網，提供案例分享、醫療專欄、專屬療程介紹及線上聯絡諮詢服務。',
    image: '/projects/otherprojects/other_pic_33.png',
    tags: ['醫療形象網', '線上諮詢', '前端設計'],
  },
  {
    id: 'other30',
    name: 'TWSE 2025 Fact Book',
    description: '臺灣證券交易所年度概況線上電子書互動網頁，將龐雜的數據資料轉化為清晰易讀的視覺報表。',
    image: '/projects/otherprojects/other_pic_34.png',
    tags: ['公部門網頁', '數據圖表', '前端開發'],
  },
  {
    id: 'other31',
    name: '國立臺灣史前文化博物館',
    description: '台東史前文化博物館官方網站，提供遺址地景導覽、3D文物展示與展覽介紹，推廣台灣史前文化。',
    image: '/projects/otherprojects/other_pic_35.png',
    tags: ['博物館官網', '線上導覽', '前端開發'],
  },
  {
    id: 'other32',
    name: '法國巴黎人壽 官方 APP 介紹網',
    description: '推廣 BNP PARIBAS CARDIF 最新行動服務 APP 之行銷導頁，介紹指紋登入與保單管理等痛點解決功能。',
    image: '/projects/otherprojects/other_pic_36.png',
    tags: ['APP介紹頁', 'Landing Page', '前端開發'],
  },
  {
    id: 'other33',
    name: '科亞企業 CO-ACTION',
    description: '專業工程塑膠代理商企業網站，展示超過 25 年的代理產品資訊與企業沿革，提供 B2B 廠商尋找材料之平台。',
    image: '/projects/otherprojects/other_pic_37.png',
    tags: ['企業官網', 'B2B', '前端開發'],
  },
  {
    id: 'other34',
    name: '國立臺灣科技大學 校友總會',
    description: '臺科大校友總會專屬網站，提供歷屆傑出校友名錄、最新活動消息與校友交流平台。',
    image: '/projects/otherprojects/other_pic_38.png',
    tags: ['校友會網站', '資訊平台', '前端開發'],
  },
  {
    id: 'other35',
    name: '台中高工 空調管理系統',
    description: '為校園設計的智慧空調管理後台系統，提供班級時段預約表、儲值餘額管理以及電價與設備遠端控制。',
    image: '/projects/otherprojects/other_pic_39.png',
    tags: ['物聯網', '校園管理系統', 'Dashboard'],
  },
  {
    id: 'other36',
    name: '空汙即時監測系統與油價走勢',
    description: '整合即時空汙感測數據(PM2.5)與國際油價走勢的大型儀表板平台，提供互動地圖與多維度資訊視覺化。',
    image: '/projects/otherprojects/other_pic_40.png',
    tags: ['數據可視化', '監測Dashboard', '前端開發'],
  },
];
