/* =========================================================
 * 作品数据 —— 平时只需要改这个文件
 * ---------------------------------------------------------
 * 字段说明：
 *   title     作品名
 *   category  分类（自动生成筛选按钮，可自由增加）
 *   year      年份
 *   duration  时长，如 "04:18"
 *   cover     封面图路径（可选）。留空则自动生成渐变占位图。
 *             建议 16:9，1280×720 以上，放到 assets/thumbs/ 下
 *   url       codapan 嵌入地址。获取方式：作品页 → 分享/嵌入 →
 *             复制 iframe 里 src 的值，形如
 *             https://www.codapan.com/s/xxxx?embed=1&layout=full
 *             留空则卡片显示为「示例」占位，点击不会播放
 *   note      角标备注（可选），如 "课程作业"
 * ========================================================= */

window.WORKS = [
  {
    title: "MY COURAGE",
    category: "剧情",
    year: "2025",
    duration: "04:23",
    cover: "assets/thumbs/my-courage.jpg",
    url: "https://www.codapan.com/s/hjkJfAApRhxJ?embed=1&layout=full",
    note: "校园剧情短片"
  },
  {
    title: "街巷烟火，青春食光",
    category: "纪录",
    year: "2026",
    duration: "04:47",
    cover: "assets/thumbs/jiexiang-yanhuo.jpg",
    url: "https://www.codapan.com/s/ROgIFYAiosEC?embed=1&layout=full",
    note: "新采 3、4 班小组作品"
  },
  {
    title: "零食测评",
    category: "短视频",
    year: "2026",
    duration: "05:09",
    cover: "assets/thumbs/snack-review.jpg",
    url: "https://www.codapan.com/s/pGiJAiBYDdBU?embed=1&layout=full",
    note: "口播 · 测评"
  }
];
