"use client";

import { useState } from "react";

const inputClass =
  "w-full border-0 border-b border-[var(--line)] bg-transparent py-2 text-sm font-light text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-faint)]/50 focus:border-[var(--gold)]";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, boolean> = {
      name: !values.name.trim(),
      email: !values.email.trim(),
      message: !values.message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-[var(--bg2)] px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-14 sm:grid-cols-2 sm:gap-24">
        <div>
          <div className="aurum-rv">
            <span className="text-[0.6rem] tracking-[0.4em] text-[var(--gold)] uppercase">
              Contact — 聯絡我們
            </span>
            <div className="mt-2 h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="aurum-rv font-display mt-4 text-3xl font-light text-[#e8dfc8] sm:text-4xl">
            讓我們
            <br />
            <em className="text-[var(--gold)]/70 not-italic">為您服務</em>
          </h2>
          <p className="aurum-rv mt-4 text-sm leading-loose text-[var(--ink-faint)]">
            訂單查詢、商品諮詢或私人訂製服務,我們的專業顧問將在 24 小時內親自回覆。
          </p>
          <div className="aurum-rv mt-6 space-y-4">
            {[
              { label: "門市地址", value: "台北市信義區松仁路 88 號 12F" },
              { label: "客服電話", value: "+886 2 2345 6789" },
              { label: "電子信箱", value: "shop@platinumparfum.com" },
              { label: "營業時間", value: "週二至週日 11:00 – 20:00" },
            ].map((row) => (
              <div key={row.label} className="border-b border-[var(--line)] pb-4">
                <div className="text-[0.5rem] tracking-[0.3em] text-[var(--gold)] uppercase">
                  {row.label}
                </div>
                <div className="font-display mt-1 text-sm text-[#9e8e6e]">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="aurum-rv">
          {submitted ? (
            <div className="border border-[var(--line)] bg-[var(--bg)]/40 p-6 text-center">
              <p className="font-display text-lg text-[var(--gold)] italic">感謝您的來訊 ✦</p>
              <p className="mt-1 text-xs text-[var(--ink-faint)]">我們將於 24 小時內與您聯繫。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label className="mb-1.5 block text-[0.5rem] tracking-[0.26em] text-[var(--gold)]/60 uppercase">
                  姓名 *
                </label>
                <input
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  placeholder="王小明"
                  className={`${inputClass} ${errors.name ? "border-[var(--red)]" : ""}`}
                />
              </div>
              <div className="mb-5">
                <label className="mb-1.5 block text-[0.5rem] tracking-[0.26em] text-[var(--gold)]/60 uppercase">
                  電子信箱 *
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={`${inputClass} ${errors.email ? "border-[var(--red)]" : ""}`}
                />
              </div>
              <div className="mb-5">
                <label className="mb-1.5 block text-[0.5rem] tracking-[0.26em] text-[var(--gold)]/60 uppercase">
                  訊息 *
                </label>
                <textarea
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  placeholder="請告訴我們您的需求…"
                  rows={3}
                  className={`${inputClass} resize-none ${errors.message ? "border-[var(--red)]" : ""}`}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-gold-gradient px-7 py-3 text-[0.56rem] tracking-[0.3em] text-black uppercase shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-105"
                >
                  送出
                </button>
                <span className="text-[0.5rem] text-[var(--ink-faint)] tracking-wide">
                  24 小時內回覆
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
