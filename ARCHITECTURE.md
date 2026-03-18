# Architecture — showroom2 Portfolio

> **Project:** showroom2
> **Repository:** d:\@GitHubProject\showroom2
> **Stack:** Next.js 16 · React 19 · Three.js 0.183 · @react-three/fiber · @react-three/drei · GSAP 3
> **Last Updated:** 2026-03-18
> **Purpose:** 求職用互動式 3D 作品集網站

---

## 1. Project Structure

```
showroom2/
│
├── app/                          # Next.js App Router 入口
│   ├── globals.css               # 全域 CSS 變數、reset
│   ├── layout.tsx                # 根 Layout（metadata、body）
│   └── page.tsx                  # 首頁（/ 路由）
│
├── components/                   # 所有 React 元件
│   ├── Navbar.tsx                # 頂部導覽列
│   ├── HeroSection.tsx           # Hero 版面容器
│   ├── Scene3D.tsx               # R3F Canvas 根元件（含 ScrollControls）
│   ├── HeroText3D.tsx            # 3D 場景內的浮動文字
│   ├── CharacterModel.tsx        # GLB 人物模型載入與動畫（含捲動狀態機）
│   ├── DeskRoom.tsx              # 桌椅、螢幕、地毯等場景幾何
│   ├── FloatingElements.tsx      # 漂浮裝飾物件（相框、對話泡泡、程式碼標籤）
│   ├── RoleCards.tsx             # 三個職能卡片（隨捲動輪替前景/背景）
│   └── RoleCards.module.css      # 職能卡片 Glassmorphism 樣式
│
├── public/
│   └── models/                   # 靜態 3D 模型（由 Next.js 直接伺服）
│       ├── meshy.glb             # ✅ 使用中：Meshy AI 卡通人物（含動畫）
│       ├── character.glb         # 備用：ReadyPlayerMe 角色（無動畫）
│       └── cartoon.glb           # 備用：Tripo3D 靜態卡通網格
│
├── next.config.ts                # Next.js 設定（transpilePackages）
├── tsconfig.json                 # TypeScript 設定
├── package.json                  # 依賴與 npm scripts
└── next-env.d.ts                 # Next.js 自動生成的型別宣告
```

---

## 2. High-Level System Diagram

```
瀏覽器
  │
  ├─ [HTML / CSS]
  │     app/globals.css          全域樣式、CSS 變數
  │     app/layout.tsx           <html> 根節點、metadata
  │
  └─ [React Tree]
        app/page.tsx
          │
          ├── Navbar.tsx         固定頂部導覽（GSAP 入場）
          │
          └── HeroSection.tsx    全螢幕容器（100vw × 100vh）
                │
                └── Scene3D.tsx  [Client-only, dynamic import SSR=false]
                      │
                      ├── R3F Canvas  camera [0, 2.4, 7.5] fov=40
                      │     │
                      │     ├── Lights         ambient / directional / point
                      │     ├── ContactShadows 地面陰影
                      │     ├── Environment    preset="apartment" HDRI
                      │     ├── OrbitControls  限制角度、無縮放/平移
                      │     │
                      │     └── ScrollControls pages=4, damping=0.2
                      │           │
                      │           ├── DisappearingBackground  ← 捲動時向後/上方退場
                      │           │     ├── HeroText3D     Html overlay
                      │           │     ├── DeskRoom       純 Three.js 幾何
                      │           │     └── FloatingElements GSAP 動畫物件
                      │           │
                      │           ├── CharacterModel  坐→站→走 狀態機
                      │           └── RoleCards        3 張 Glassmorphism 卡片輪替
                      │
                      └── [WebGL → GPU]
```

---

## 3. Core Components

### `app/layout.tsx`
- **用途：** Next.js App Router 根 Layout
- **技術：** Next.js Metadata API
- **功能：** 設定頁面 `<title>`、`<meta description>`，包裹全域 CSS，提供 `<body>` 給所有子路由
- **渲染模式：** Server Component（靜態）

---

### `app/page.tsx`
- **用途：** 網站首頁（`/` 路由）
- **功能：** 組合 `<Navbar>` 與 `<HeroSection>`，無額外邏輯
- **渲染模式：** Server Component → 預渲染為靜態 HTML

---

### `app/globals.css`
- **用途：** 全域樣式基底
- **內容：**
  - `box-sizing: border-box` reset
  - CSS 自訂變數（`--bg`, `--accent`, `--badge-bg` 等調色盤）
  - `body` 背景色 `#f5ede3`（暖米色，對應設計參考）

---

### `components/Navbar.tsx`
- **用途：** 固定頂部導覽列
- **技術：** React Client Component、GSAP
- **功能：**
  - 中央 pill 膠囊群組（ABOUT / PROJECTS / CONTACT）
  - 右側橙色 CTA 按鈕「GET IN TOUCH」
  - 右側音效靜音切換按鈕（`useState`）
  - 進入時 GSAP `fromTo` 從上滑入（`y: -60 → 0`）
- **樣式：** inline styles，`backdrop-filter: blur(8px)`

---

### `components/HeroSection.tsx`
- **用途：** Hero 區塊容器，佔滿整個 viewport
- **技術：** Next.js `dynamic()` import，`ssr: false`
- **功能：**
  - 以 `dynamic` 延遲載入 `Scene3D`（WebGL 不支援 SSR）
  - 載入中顯示橙色圓點佔位符
  - 本身只是 `100vw × 100vh` 的容器，不含任何 2D 文字（文字在 3D 內部）

---

### `components/Scene3D.tsx`
- **用途：** R3F Canvas 根元件，管理整個 3D 場景
- **技術：** `@react-three/fiber` Canvas、`@react-three/drei`（`ScrollControls`、`useScroll`）
- **相機設定：**
  ```
  position: [0, 2.4, 7.5]   前方正面視角，略微俯視
  fov: 40                    自然透視感
  ```
- **捲動系統：**
  - `<ScrollControls pages={4} damping={0.2}>` 接管頁面滾動，產生 4 個 viewport 的滾動距離
  - **`DisappearingBackground`**（內部元件）：包裹 `HeroText3D`、`DeskRoom`、`FloatingElements`，以 `useFrame` 讀取 `scroll.range(0, 0.2)`，在捲動初始 20% 期間將整組物件向上 (`y+3`)、向後 (`z-10`) 推移並縮小至 0.05 倍，產生「場景散開消失」的效果
- **光源：**
  | 光源 | 位置 | 用途 |
  |------|------|------|
  | AmbientLight 0.7 | 全域 | 基礎亮度 |
  | DirectionalLight 1.6 | [3, 8, 6] | 主光源（含陰影） |
  | DirectionalLight 0.5 | [-3, 4, 4] | 暖色補光 `#ffe8cc` |
  | PointLight 0.8 | [0, 1.1, -0.7] | 螢幕藍光 `#88aaff` |
- **其他：** ContactShadows、Environment preset="apartment"、OrbitControls（限制旋轉角度）
- **子元件順序：** DisappearingBackground(HeroText3D / DeskRoom / FloatingElements) → CharacterModel → RoleCards

---

### `components/HeroText3D.tsx`
- **用途：** 在 3D 場景內部浮動顯示的 Hero 文字（姓名、職稱、簡介）
- **技術：** `@react-three/drei` Html 元件、GSAP
- **原理：**
  - `<Html distanceFactor={6}>` 將 DOM 節點投影到 3D 世界座標 `[-2.4, 1.4, 2.0]`
  - 不使用 `transform`，文字面向鏡頭且不隨旋轉透視變形（清晰易讀）
  - `distanceFactor=6` 使文字大小隨鏡頭距離縮放
- **動畫：**
  - GSAP stagger 入場：`opacity: 0 → 1`，`y: 30 → 0`，每段間隔 0.14s
  - Group 持續上下漂浮（`y ± 0.08`，2.6s sine）
- **包含：** 姓名 `<h1>`、職稱 badge `<div>`、tagline `<p>`

---

### `components/CharacterModel.tsx`
- **用途：** 載入並播放 GLB 人物模型，隨捲動切換動作
- **技術：** `useGLTF`（含 preload）、`useAnimations`、`useScroll`、`useFrame`、GSAP
- **使用模型：** `public/models/meshy.glb`（Meshy AI，含 3 個動畫）
- **動畫狀態機（基於捲動進度）：**
  ```
  entrance  →  sitting  →  standing_up  →  walking
               ↑                                │
               └── offset < 0.02 反向坐下 ───────┘
  ```
  | State | 觸發條件 | 實作 |
  |-------|----------|------|
  | `entrance` | 頁面初載 | `Sit_to_standTransition` 反向播放（站→坐），`clampWhenFinished` 定格 |
  | `sitting` | 反向播完 / 滾回 | 坐姿定格 + GSAP idle float |
  | `standing_up` | `scroll.offset > 0.05` | `Sit_to_standTransition` 正向播放（坐→站）|
  | `walking` | 起立動畫播完 | 切換為 `Walking` 動畫循環，角色微往前移動 (`z+0.5`) |
- **GSAP 入場：** 從 `y=3` 落下至 `y=0`（`power3.out`，0.5s delay）
- **Idle：** 坐定後輕微上下漂浮（`y: 0 → 0.05`，2.6s sine loop）
- **材質：** 遍歷場景，所有 `Mesh` 啟用 `castShadow`、`receiveShadow`、`DoubleSide`
- **方向：** `rotation Y = 0`（面向鏡頭，即面向 +Z）

---

### `components/DeskRoom.tsx`
- **用途：** 整個房間佈景（純 Three.js 幾何，無外部模型）
- **技術：** `@react-three/fiber` 聲明式幾何、`Three.DoubleSide`
- **場景座標邏輯：**
  ```
  相機  z=+7.5
  角色  z=0       面向相機
  椅子  z=-0.3    角色身後
  桌子  z=-0.9    桌面在椅子後方
  螢幕  z=-0.9    桌面上方
  ```
- **子元件說明：**
  | 元件 | 描述 |
  |------|------|
  | `Floor` | 無邊大地板（20×20 平面，`#ede5d8`）|
  | `Rug` | 三層橙/黃條紋地毯（`#f97316` / `#fbbf24` / `#fde68a`）|
  | `Chair` | 5 星底座辦公椅（Box + Cylinder 組合）|
  | `Desk` | 白色木桌，4 支圓柱桌腳 |
  | `Monitors` | 雙螢幕（含 emissive 螢幕發光、程式碼線條）|
  | `CornerPlant` | 角落盆栽（圓柱盆 + 多片 DoubleSide 葉片）|
- **設計風格：** 卡通暖色調，對應 david-hckh.com 參考設計

---

### `components/FloatingElements.tsx`
- **用途：** 場景中漂浮的裝飾物，增加視覺活潑感
- **技術：** `@react-three/fiber`、GSAP
- **子元件：**
  | 元件 | 位置 | 效果 |
  |------|------|------|
  | `PictureFrame` | `[1.5, 1.9, -0.6]` | 從右側飛入 + 上下漂浮 + 微旋轉 |
  | `ChatBubble` | `[-0.8, 2.1, 0.4]` | scale `0→1` 彈出 + 上下漂浮 |
  | `CodeTag` | `[1.2, 2.0, 0.2]` | 從下方升起 + 持續 360° Y 軸旋轉 |
- **進場時序：**
  ```
  delay 1.2s → PictureFrame 飛入
  delay 1.6s → ChatBubble 彈出
  delay 1.8s → CodeTag 升起
  ```

---

### `components/RoleCards.tsx`
- **用途：** 三個職能角色卡片（FullStack Web Develop / UX Strategist / Product Manager），隨捲動 Carousel 輪替
- **技術：** `@react-three/drei` Html（`transform`）、`useScroll`、`useFrame`
- **卡片資料：**
  | 卡片 | 標題 | 副標 | 邊框色 |
  |------|------|------|--------|
  | 0 | FullStack Web Develop | 零溝通摩擦的跨域效率建築師 | 藍 `#3b82f6` |
  | 1 | UX Strategist | 以同理心洞察需求的產品策略師 | 橘 `#f97316` |
  | 2 | Product Manager | 精準優先級管理及決策的專案舵手 | 綠 `#22c55a` |
- **輪替演算法：**
  - 每張卡片有一個「中心進度點」（`0.35`, `0.65`, `0.95`），當 `scroll.offset` 接近該值時，卡片置中 (`x=0`, `z` 靠前)，透明度趨近 1
  - 偏離中心時，卡片以 `sin/cos` 推向左右兩側並退後，透明度遞減，產生 3D Carousel 效果
  - `scroll.offset < 0.18` 時所有卡片隱藏於下方 (`y=-4`)
  - 位置透過 `THREE.MathUtils.lerp` 逐幀平滑插值
- **樣式（`RoleCards.module.css`）：**
  - Glassmorphism：`rgba(20,20,20,0.65)` 背景 + `backdrop-filter: blur(16px)`
  - 各卡片有獨立的彩色邊框與 box-shadow
  - Tags 水平排列的藥丸標籤

---

## 4. Data Stores

本專案無後端資料庫。唯一的「資料」是靜態檔案：

| 資產 | 位置 | 大小 | 說明 |
|------|------|------|------|
| meshy.glb | `public/models/` | 16 MB | 主角人物（Meshy AI，含 3 動畫） |
| character.glb | `public/models/` | 1.3 MB | 備用 ReadyPlayerMe 角色 |
| cartoon.glb | `public/models/` | 11.8 MB | 備用 Tripo3D 靜態網格 |

---

## 5. External Integrations / APIs

| 服務 | 用途 | 說明 |
|------|------|------|
| `Environment preset="apartment"` | HDRI 環境光 | drei 內建，從 Poly Haven CDN 載入 |
| Google Fonts（計畫中） | 字型 | 目前使用系統 fallback font stack |

---

## 6. Deployment & Infrastructure

| 項目 | 說明 |
|------|------|
| **框架** | Next.js 16（App Router，靜態預渲染） |
| **建置指令** | `npm run build` |
| **開發指令** | `npm run dev`（port 4000，port 3000 在此機器上被保留）|
| **預計部署** | Vercel / GitHub Pages / 任何支援 Next.js 的平台 |
| **建置輸出** | 所有路由預渲染為靜態 HTML（`○ Static`）|
| **SSR 策略** | `Scene3D` 以 `dynamic({ ssr: false })` 確保 WebGL 只在瀏覽器執行 |

---

## 7. Security Considerations

| 項目 | 說明 |
|------|------|
| **XSS** | 無使用者輸入，無風險 |
| **GLB 模型** | 僅從 `public/` 伺服，非使用者上傳 |
| **外部請求** | 只有 drei Environment HDRI（只讀資源）|
| **敏感資訊** | 無 API key、無環境變數 |

---

## 8. Development & Testing Environment

### 本地啟動
```bash
# 安裝（node_modules 已存在可跳過）
npm install

# 開發伺服器（port 4000）
npm run dev

# 型別檢查
npx tsc --noEmit

# 生產建置
npm run build
```

### 注意事項
- **Port 3000 / 3001** 在此 Windows 機器上會出現 `EACCES`，固定使用 port 4000
- **ChunkLoadError** 首次載入時偶發，`Ctrl+Shift+R` 強制重整可解決
- **GLB 檔案** 16 MB，可能觸發 Windows Defender 掃描導致載入延遲

### 目錄結構（開發 vs 原始）
```
根目錄 *.glb       → 原始模型（開發參考用，不部署）
public/models/*.glb → 實際伺服的模型（部署用）
```

---

## 9. Future Considerations / Roadmap

| 優先 | 項目 | 說明 |
|------|------|------|
| 高 | 補充個人資訊 | 將 `HeroText3D` 的姓名 / 職稱換成真實內容 |
| 高 | About / Projects / Contact 頁面 | 目前 Navbar 連結無對應 section |
| 中 | 捲動動畫微調 | 調整 ScrollControls 的 pages 和 damping，以及卡片輪替的中心進度點 |
| 中 | 響應式設計 | 目前僅針對桌機設計，需處理手機版（含 touch scroll 與卡片尺寸） |
| 中 | 字型優化 | 引入 Google Fonts（Inter Black）取代系統字型 |
| 低 | 音效系統 | Navbar 靜音按鈕目前無對應音效邏輯 |
| 低 | 頁面過場動畫 | 路由切換時的 GSAP 過場 |
| 低 | 效能優化 | GLB 壓縮（gltf-transform / draco）、lazy loading |

---

## 10. Glossary / Acronyms

| 詞彙 | 說明 |
|------|------|
| **R3F** | React Three Fiber — Three.js 的 React 封裝，聲明式 3D |
| **Drei** | @react-three/drei — R3F 的 helper 元件庫（Html、useGLTF、OrbitControls 等）|
| **GLB** | GL Binary — glTF 的二進位格式，包含網格、材質、動畫 |
| **GSAP** | GreenSock Animation Platform — JavaScript 動畫引擎 |
| **HDRI** | High Dynamic Range Image — 用於場景環境光照的全景圖 |
| **ContactShadows** | drei 的平面陰影元件，替代 Three.js 的 `shadow-map`，效能更好 |
| **distanceFactor** | Html 元件的縮放係數，使 HTML overlay 跟隨 3D 視角縮放 |
| **clampWhenFinished** | AnimationAction 屬性，動畫播完後保持最後一幀 |
| **SSR** | Server-Side Rendering — WebGL 不支援，Scene3D 以 `ssr: false` 繞過 |
| **T-pose** | 角色模型預設站姿（雙臂水平展開），作為骨骼動畫的起始姿勢 |
| **ScrollControls** | drei 的捲動控制元件，接管頁面滾動並映射為 0~1 的 offset 供 3D 動畫使用 |
| **Glassmorphism** | 玻璃擬態設計風格，使用半透明背景 + `backdrop-filter: blur()` 製造磨砂玻璃質感 |
| **Carousel** | 旋轉木馬式的輪播佈局，卡片在 3D 空間中輪流移至前景 |
