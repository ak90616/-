"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sz: number;
  op: number;
  hue: number;
  life: number;
  lifeSpeed: number;
  trail: { x: number; y: number }[];
};

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const bgImage = new Image();
    bgImage.src = "/images/img_sand.jpg";

    const PARTICLE_COUNT = 140;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 2000,
      y: window.innerHeight + Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.4 + Math.random() * 1),
      sz: 0.6 + Math.random() * 2,
      op: Math.random() * 0.7 + 0.15,
      hue: 38 + Math.random() * 16,
      life: Math.random(),
      lifeSpeed: 0.0015 + Math.random() * 0.003,
      trail: [],
    }));

    const rays = [
      { x: 0.35, angle: Math.PI / 2 + 0.2, len: 0.6, w: 0.1 },
      { x: 0.62, angle: Math.PI / 2 - 0.15, len: 0.52, w: 0.07 },
      { x: 0.5, angle: Math.PI / 2, len: 0.65, w: 0.05 },
    ];

    let t = 0;
    let raf = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (bgImage.complete && bgImage.naturalWidth) {
        const scale = Math.max(W / bgImage.naturalWidth, H / bgImage.naturalHeight);
        ctx.drawImage(
          bgImage,
          (W - bgImage.naturalWidth * scale) / 2,
          (H - bgImage.naturalHeight * scale) / 2,
          bgImage.naturalWidth * scale,
          bgImage.naturalHeight * scale,
        );
        ctx.fillStyle = "rgba(5,4,3,.72)";
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.fillStyle = "#060504";
        ctx.fillRect(0, 0, W, H);
      }

      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.08, W / 2, H / 2, H * 0.72);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,.7)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      rays.forEach((r) => {
        const gx = r.x * W;
        const pulse = 0.035 + 0.018 * Math.sin(t * 0.5);
        const rg = ctx.createLinearGradient(gx, 0, gx, H * r.len);
        rg.addColorStop(0, `rgba(201,155,50,${pulse + 0.025})`);
        rg.addColorStop(0.5, `rgba(180,120,40,${pulse * 0.4})`);
        rg.addColorStop(1, "rgba(180,120,40,0)");
        ctx.save();
        ctx.translate(gx, 0);
        ctx.rotate(r.angle - Math.PI / 2);
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.moveTo(-W * r.w * 0.5, 0);
        ctx.lineTo(W * r.w * 0.5, 0);
        ctx.lineTo(W * r.w * 0.3, H * r.len);
        ctx.lineTo(-W * r.w * 0.3, H * r.len);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * 0.3 + p.y * 0.01) * 0.15;
        p.y += p.vy;
        p.life += p.lifeSpeed;
        const fade = Math.sin(p.life * Math.PI);
        if (p.y < -20 || p.life >= 1) {
          p.x = Math.random() * W;
          p.y = H + 10;
          p.life = 0;
          p.trail = [];
          p.sz = 0.6 + Math.random() * 2.2;
          p.vy = -(0.4 + Math.random() * 1);
        }
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 7) p.trail.shift();
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          p.trail.forEach((pt) => ctx.lineTo(pt.x, pt.y));
          ctx.strokeStyle = `hsla(${p.hue},80%,60%,${fade * 0.15})`;
          ctx.lineWidth = p.sz * 0.5;
          ctx.stroke();
        }
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.sz * 2.2);
        glow.addColorStop(0, `hsla(${p.hue},88%,74%,${fade * p.op})`);
        glow.addColorStop(1, `hsla(${p.hue},80%,55%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });
      ctx.restore();

      const ambient = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, W * 0.38);
      ambient.addColorStop(0, `rgba(180,120,30,${0.032 + 0.015 * Math.sin(t * 0.6)})`);
      ambient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, W, H);

      const letterbox = Math.round(H * 0.065);
      ctx.fillStyle = "#060504";
      ctx.fillRect(0, 0, W, letterbox);
      ctx.fillRect(0, H - letterbox, W, letterbox);

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
