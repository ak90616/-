const REVIEWS = [
  {
    text: "「噴上琥珀鉑金的那一刻,整個人的氣場都不同了。每次出席重要場合都靠它留下深刻印象。」",
    author: "Sophia Chen · 台北",
    product: "琥珀鉑金 · 已購買",
  },
  {
    text: "「玫瑰晨露是我用過最耐久的香水之一,從早晨到深夜都能感受到它的存在,真正的奢華體驗。」",
    author: "James Wu · 高雄",
    product: "玫瑰晨露 · 已購買",
  },
  {
    text: "「檀木沉香的層次感很驚艷,前調微苦、後調轉為溫潤,包裝也非常精緻,送禮自用兩相宜。」",
    author: "Emily Lin · 新竹",
    product: "檀木沉香 · 已購買",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 px-5 py-20 sm:px-10 sm:py-28">
      <div className="aurum-rv mx-auto mb-14 max-w-6xl text-center">
        <p className="text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
          Reviews — 顧客評價
        </p>
        <h2 className="font-display mt-3 text-3xl font-light text-[#e8dfc8] sm:text-4xl">
          真實回饋
        </h2>
      </div>
      <div className="aurum-rv mx-auto grid max-w-5xl grid-cols-1 gap-px bg-[var(--line)] sm:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <div key={i} className="flex flex-col gap-3 bg-[var(--bg)] p-8">
            <span className="text-sm text-[var(--gold)]">★★★★★</span>
            <p className="font-display text-base leading-relaxed text-[#b8a880] italic">
              {review.text}
            </p>
            <span className="mt-1 text-[0.55rem] tracking-[0.2em] text-[var(--ink-faint)] uppercase">
              {review.author}
            </span>
            <span className="text-[0.5rem] tracking-[0.15em] text-[var(--gold)]/40 uppercase">
              {review.product}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
