export interface ICareer {
  id: string;
  role: string;
  time: string;
  company: string | string[];
  responsibilities: string[];
}

export const careers: ICareer[] = [
  {
    id: 'career01',
    role: 'web developer',
    time: '2010-2019',
    company: ['飛象資訊', '臻澄設計', '鴻海集團-鴻圖股份有限公司'],
    responsibilities: ['網頁前後端開發', '效能優化與維護', '跨部門技術協作', '技術策略與概念驗證']
  },
  {
    id: 'career02',
    role: 'project manager (lead)',
    time: '2019-2021',
    company: ['鴻海集團-鴻圖股份有限公司'],
    responsibilities: ['標案評估與策略', '開發週期管理', '開發流程優化與文件建立', '客戶關係與風險管理']
  },
  {
    id: 'career03',
    role: 'ux strategist (lead)',
    time: '2021-2024',
    company: '方型糖創意數位有限公司',
    responsibilities: ['售前策略與提案規劃', '利害關係人管理與工作坊引導', '用戶研究與設計驗證', '產品流程及架構設計']
  }
];
