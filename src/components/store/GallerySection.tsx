const TILES = [
  { emoji: "🕯️", caption: "調香工藝 · 匠心淬鍊", wide: true },
  { emoji: "🌾", caption: "天然萃取 · 原料溯源" },
  { emoji: "🥃", caption: "手工封裝 · 鉑金瓶身" },
  { emoji: "🔬", caption: "香氛研究室 · 精準配比" },
  { emoji: "📜", caption: "限量典藏 · 編號認證", wide: true },
  { emoji: "🌍", caption: "永續承諾 · 責任採購" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-[var(--bg2)] px-5 py-20 sm:px-10 sm:py-28">
      <div className="aurum-rv mx-auto mb-14 max-w-6xl text-center">
        <p className="text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
          Craft — 品牌工藝
        </p>
        <h2 className="font-display mt-3 text-3xl font-light text-[#e8dfc8] sm:text-4xl">
          品牌故事
        </h2>
      </div>
      <div className="aurum-rv mx-auto grid max-w-5xl grid-cols-2 gap-0.5 sm:grid-cols-3">
        {TILES.map((tile, i) => (
          <div
            key={i}
            className={`group relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-gold-gradient-soft ${
              tile.wide ? "aspect-[16/9] sm:col-span-2" : ""
            }`}
          >
            <span className="text-6xl transition-transform duration-700 ease-out group-hover:scale-110">
              {tile.emoji}
            </span>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <span className="font-display text-sm font-light text-[var(--gold-light)]">
                {tile.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
