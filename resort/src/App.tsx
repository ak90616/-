import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { ParallaxSection } from "@/components/ParallaxSection"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <ParallaxSection
        id="pool"
        image={`${import.meta.env.BASE_URL}infinity-pool.jpg`}
        alt="空拍鏡頭下的無邊際泳池，泳池邊緣與海平面相連，四周被棕櫚樹與茅草屋頂的度假別墅環繞"
        eyebrow="無邊際泳池"
        title="泳池的盡頭，是整片海"
        align="left"
        speed={0.14}
      >
        <p>
          兩座相連的無邊際泳池沿著海岸線鋪展，池水在日落時染成金橘色，
          與遠方的海平面幾乎融成一線。躺椅、涼亭、石板小徑都藏在椰林之間，
          從房間走到池邊只要幾步路。
        </p>
      </ParallaxSection>
      <ParallaxSection
        id="sunset"
        image={`${import.meta.env.BASE_URL}sunset-couple.jpg`}
        alt="一對情侶站在無邊際泳池邊，眺望夕陽落入安達曼海，泳池畔點著溫暖的燈籠"
        eyebrow="夕陽套房"
        title="為兩個人保留的日落"
        align="right"
        speed={0.14}
      >
        <p>
          每間海景套房都留了一段專屬的日落時刻。泳池畔的燈籠一盞盞亮起，
          晚風裡是海浪的聲音，這一天剩下的行程，只有並肩看著太陽落海。
        </p>
      </ParallaxSection>
      <Footer />
    </div>
  )
}
