# 求职作品集 · 纯静态站点（Ayer 风格）

一个不依赖任何框架、不需要服务器的作品集页面。整个站点只有几个纯文本文件 + 几张封面图，丢到 EdgeOne Pages 上就能用，不用域名也不用服务器。
视频不放在仓库里，而是用 codapan 的 16:9 嵌入播放器按需加载。

视觉走 **Ayer** 的路子：左侧一条深色窄栏（鼠标移上去会展开），首屏整屏大图压深色遮罩、居中大标题 + 打字机副标题，往下是纯白内容区、大量留白和 1px 细线。

同目录的 `preview.jpg` 是桌面整页效果图，只是给你看效果的，页面本身用不到它，部署时可以一起传也可以删掉。

## 目录结构

```
portfolio/
├─ index.html          # 页面结构（改名字、简介、联系方式都在这里）
├─ assets/
│  ├─ style.css        # 样式（白底 + 深色窄侧栏，改配色/首屏大图看文件顶部 :root）
│  ├─ works.js         # ★ 作品数据：加片子只改这个文件
│  ├─ app.js           # 交互逻辑（一般不用动，打字机文案在这里）
│  └─ thumbs/          # 作品封面图（16:9，1280×720 左右）
├─ preview.jpg         # 效果预览图（非必需）
└─ README.md
```

## 一、改成你自己的

用任意编辑器（VS Code / 记事本）打开 `index.html`，搜索替换这几处：

| 位置 | 现在的内容 | 改成 |
|---|---|---|
| `<title>` / `meta description` | 李若冰 · 影像作品集 | 你的名字 |
| `.rail__text` | 李若冰 · 影像 | 你的名字（桌面左侧栏，hover 才显示） |
| `.drawer__head` | 李若冰 · 影像 | 你的名字（手机端菜单顶部） |
| `.hero__kicker` | 求职作品集 · 2026 | 你的标题 / 年份 |
| `.hero__title` | 把作业，<br />拍成作品。 | 你的标语（`<br />` 控制换行） |
| `.about__text` 里的两段 `<p>` | 新闻采编专业…… | 你的专业与经历 |
| `.facts` | 设备 / 后期 / 求职方向 | 你的实际情况（可增删 `<div>`） |
| `.contact__mail` | 2086339085@qq.com | 你的邮箱（`href` 和文字都要改） |
| `.contact__meta` | 微信 irrr00625 · 坐标 武汉 · 求职中 …… | 你的微信 / 城市 / 状态 |
| `.drawer__foot`、`.foot__inner` | © 2026 李若冰 | 你的署名 |

还有两处不在 `index.html`：

- **打字机副标题**：`assets/app.js` 第 186 行 `var text = "采访 · 拍摄 · 剪辑 · 出镜";`
- **左侧栏中文名**：`index.html` 里 `.rail__mark` 的「影」字（方形框里的那个字），可以换成你姓氏或一个符号。

## 二、换首屏大图与配色（最出效果的一步）

现在首屏已经是一张插画大图 `assets/hero.jpg`（2400×1350，约 200KB），遮罩、暗角、颗粒都叠好了。想换成自己的剧照：

1. 直接用同名文件覆盖 `assets/hero.jpg`（建议 16:9、1920×1080 以上、JPG 压到 400KB 以内）；
2. 如果换了文件名，改 `assets/style.css` 第 23 行的 `--hero-img`：

```css
--hero-img: url("hero.jpg");
```

注意这里写的是**相对 CSS 文件**的路径，别写成 `assets/hero.jpg`——那会变成 `assets/assets/hero.jpg`，图直接不显示。**没有大图也能用**，渐变兜底同样干净。

配色是跟着这张图定的（暖白纸感 + 陶土橙强调 + 深蓝侧栏），全部在 `style.css` 顶部 `:root`：

```css
--bg: #fdfcfa;      /* 内容区底色 */
--bg-soft: #f6f1ec; /* 联系区暖米色 */
--ink: #1b2530;     /* 正文 */
--line: #e7e3de;    /* 1px 分割线 */
--rail-bg: #1b2a36; /* 左侧深色窄栏 */
--accent: #b8542f;  /* 链接、筛选下划线、播放按钮悬停 */
```

换了图如果觉得强调色不搭，只改 `--accent` 一个值，链接、筛选下划线、播放按钮会跟着变。

## 三、加作品（重点）

打开 `assets/works.js`，现在里面已经是三个真实作品（MY COURAGE / 街巷烟火，青春食光 / 零食测评），照着复制一段改字段即可：

```js
{
  title: "回声",                 // 作品名
  category: "纪录",              // 纪录 / 剧情 / 实验（分类按钮会自动生成，不用改 HTML）
  year: "2026",
  duration: "04:18",
  cover: "assets/thumbs/echo.jpg", // 可选，留空则用渐变占位图
  url: "https://www.codapan.com/s/pGiJAiBYDdBU?embed=1&layout=full",
  note: "课程作业"                // 可选角标
}
```

`category` 写新的词（比如「广告」）也会自动多出一个筛选按钮，无需改其它文件。

### 怎么拿到 `url`

1. 在 codapan 打开你的作品页；
2. 点「分享 / 嵌入」，复制那段 `<iframe ...>` 代码；
3. 只取 `src="..."` 引号里的地址，粘到 `url` 字段。

> 如果你直接把整段 iframe 贴进 `index.html`，一个页面里有 3 个播放器时首屏会很卡。
> 这里的做法是：封面先显示，**点了才创建 iframe**，关闭弹层时清空 iframe 停止播放，所以放十几个作品也不影响打开速度。

### 封面图

- 放到 `assets/thumbs/`，建议 16:9、1280×720 以上、JPG 压缩到 200KB 以内；
- 不填 `cover` 也能用：会自动生成带编号的深蓝渐变块，先上线再补图完全没问题。

## 四、部署到 EdgeOne Pages（免费、不用域名和服务器，国内可直连）

腾讯云 EdgeOne Pages 会送一个公网地址 `https://你的项目名.edgeone.app`，国内访问比 Cloudflare / GitHub Pages 都快，不需要买域名、不需要服务器，默认域名也不用备案。

> 为什么不用 Gitee Pages：已于 2024 年停服。为什么不用 Cloudflare：`*.workers.dev` / `*.pages.dev` 在国内会被 TLS 干扰，自己挂梯子能开，发给别人经常打不开。

### 直接上传（推荐，5 分钟，不用 Git）

1. 打开 <https://pages.edgeone.ai/>，右上角 **Sign Up / Log In**（邮箱、GitHub、Google 都行，不用信用卡）；
2. 控制台 → **创建项目 / Create Project** → 选 **直接上传 / Direct Upload**（**不要**选"导入 Git 仓库"）；
3. 项目名填英文小写，比如 `lrb-works`，这个就是网址前缀；
4. 上传 `portfolio-upload.zip`（在 `portfolio` 同级目录，里面 `index.html` 在最外层，正好符合要求）；
5. 部署完成后拿到 `https://lrb-works.edgeone.app`，手机电脑都能直接打开。

以后改了作品：进项目 → **部署 / Deploy** → 重新上传一次 zip，地址不变。

> 注意：选了"直接上传"之后不能改成 Git 自动部署，要改内容就重新传 zip。单次上传限制 20000 个文件、单文件 25MB，本项目 8 个文件、最大 199KB，远远够用。

### 备用：Cloudflare Pages

国内网络对 `*.pages.dev` 时好时坏，能用则更省事：

1. <https://dash.cloudflare.com/sign-up> 注册（不用信用卡）；
2. **Workers & Pages → Create → Pages → Upload assets**；
3. 项目名英文小写 → 上传同一个 `portfolio-upload.zip` → **Deploy site**；
4. 得到 `https://项目名.pages.dev`。

如果打开报 `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`，不是你配错了，是这个域名在国内被拦，换回 EdgeOne 即可，文件完全一样。

### 备用：GitHub Pages（当前线上地址）

**https://zsy159.github.io/portfolio/**（仓库 `github.com/zsy159/portfolio`）

- 上传：把 `index.html`、`.nojekyll`、`assets/` 传到仓库根目录 → **Settings → Pages** → Source 选 `Deploy from a branch`，分支 `main`、目录 `/(root)` → Save；
- 更新：改完本地文件重新上传，或 `git push`，1 分钟内自动重建；
- 注意：`github.io` 在国内时通时不通，微信里也可能提示风险，只适合过渡期用，长期还是备案 + 国内节点。
### 几个容易踩的坑

- **zip 里 `index.html` 必须在最外层**，不能再套一层文件夹，否则首页 404、样式全丢。
- **路径必须是相对的**：`assets/style.css` 而不是 `/assets/style.css`，本项目已经是相对路径，别改。
- **项目名就是网址**，起完不好改，建议直接用拼音或英文名。
- **iframe 被拦**：如果播放器一片空白，先在浏览器控制台看报错；codapan 若限制了嵌入域名，需要在其后台把 `*.edgeone.app` 加白。
- **想绑自己的域名**：以后买了域名可以在项目里加自定义域名，免费 HTTPS；走中国大陆节点才需要备案。

## 五、本地预览

直接双击 `index.html` 就能看（`file://` 下功能正常）。
想更接近线上环境，在该目录执行：

```bash
python -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

## 六、已知限制

- 首屏没有真实视频预览（避免流量与卡顿），要「悬停自动播放预告片」需要额外上传短预览片段，可再改；
- 没有后台，加作品就是改一个 JS 文件；
- 筛选是前端过滤，作品多了（50+）仍很快，但建议按年份分组；
- 桌面端左侧栏默认只显示「作品 / 关于 / 联系」，鼠标移上去才展开编号和名字，这是 Ayer 的原样设计；手机上换成左上角按钮 + 全屏抽屉。
