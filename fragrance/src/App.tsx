import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { ParallaxSection } from "@/components/ParallaxSection"
import { Collection } from "@/components/Collection"
import { Footer } from "@/components/Footer"
import { useSpotlight } from "@/hooks/useSpotlight"

export default function App() {
  useSpotlight()

  return (
    <div className="relative min-h-screen">
      <div className="spotlight" aria-hidden="true" />
      <Nav />
      <Hero />
      <ParallaxSection
        id="origin"
        image={`${import.meta.env.BASE_URL}scene-close.jpg`}
        alt="DIVINY Noble Presence 香水瓶立於焦黑沉木與番紅花絲之間，背景為深紅漸層"
        eyebrow="調香起源"
        title="從一段燒焦的木頭開始"
        align="left"
        speed={0.14}
      >
        <p>
          深色沉木躺在餘燼般的紅光裡，番紅花絲隨手灑落——
          這是 Noble Presence 誕生的畫面：粗獷的原始感，
          包裹著方形瓶身裡細緻的琥珀香氛。
        </p>
      </ParallaxSection>
      <ParallaxSection
        id="detail"
        image={`${import.meta.env.BASE_URL}scene-macro-cap.jpg`}
        alt="DIVINY 瓶蓋特寫，拋光金屬噴頭與方形玻璃瓶身，周圍散落番紅花絲"
        eyebrow="細節見真章"
        title="金色瓶蓋，封存一段濃烈"
        align="right"
        speed={0.14}
      >
        <p>
          方形瓶身穩重如印記，金屬噴頭以拋光黃銅打造。
          液體透出深邃的琥珀紅，隨光線流動——
          每一次噴灑，都是一次儀式。
        </p>
      </ParallaxSection>
      <Collection />
      <Footer />
    </div>
  )
}
