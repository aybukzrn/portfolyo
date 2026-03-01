import { useEffect, useRef, useState } from "react";

const STATIC_STARS = 82;
const LAYERS = [
  { count: 80, rMin: 0.4, rMax: 1.0, speedMin: 0.12, speedMax: 0.28 },
  { count: 40, rMin: 1.0, rMax: 2.0, speedMin: 0.06, speedMax: 0.14 },
  { count: 15, rMin: 2.0, rMax: 3.2, speedMin: 0.03, speedMax: 0.07 },
];

function rnd(min, max) {
  return min + Math.random() * (max - min);
}

function spawnFloater(layer, randomY = false, h = window.innerHeight, w = window.innerWidth) {
  return {
    x:     rnd(0, w),
    y:     randomY ? rnd(0, h) : h + rnd(0, 40),
    _r:    rnd(layer.rMin, layer.rMax),
    vy:    rnd(layer.speedMin, layer.speedMax),
    alpha: rnd(0.4, 1.0),
    layer,
  };
}

export default function StarField({ children }) {
  const staticRef = useRef(null);
  const floatRef  = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  /* ── Mouse bazlı hafif parallax ── */
  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      if (!innerWidth || !innerHeight) return;

      // -1 ile 1 arası normalize koordinatlar (merkez 0,0)
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      // Çok hafif etki için küçük değerler
      setParallax({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  /* ── Sabit & twinkle yıldızlar ── */
  useEffect(() => {
    const canvas = staticRef.current;
    const ctx    = canvas.getContext("2d");
    let raf;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const stars = Array.from({ length: STATIC_STARS }, () => ({
      x:             rnd(0, canvas.width),
      y:             rnd(0, canvas.height),
      r:             rnd(0.3, 1.7),
      period:        rnd(2000, 6000),
      offset:        rnd(0, Math.PI * 2),
      baseAlpha:     rnd(0.5, 1.0),
    }));

    function draw(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const t     = (ts % s.period) / s.period;
        const alpha = s.baseAlpha * (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(2 * Math.PI * t + s.offset)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    const onResize = () => { resize(); stars.forEach(s => { s.x = rnd(0, canvas.width); s.y = rnd(0, canvas.height); }); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ── Yüzen yıldızlar ── */
  useEffect(() => {
    const canvas = floatRef.current;
    const ctx    = canvas.getContext("2d");
    let raf;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const floaters = [];
    LAYERS.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        floaters.push(spawnFloater(layer, true, canvas.height, canvas.width));
      }
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        f.y -= f.vy;

        if (f.y + f._r < 0) {
          floaters[i] = spawnFloater(f.layer, false, canvas.height, canvas.width);
          continue;
        }

        const fade = Math.min(1, f.y / (canvas.height * 0.15));
        ctx.beginPath();
        ctx.arc(f.x, f.y, f._r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.alpha * fade})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(ellipse at bottom, #412B6B 10%, #FFD3D5 100%)" }}
    >
      {/* Sabit & twinkle yıldızlar (ekran boyutuna sabit, sayfa uzasa da büyümez) */}
      <canvas
        ref={staticRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate3d(${-parallax.x * 10}px, ${-parallax.y * 10}px, 0)`,
        }}
      />

      {/* Yüzen yıldızlar */}
      <canvas
        ref={floatRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate3d(${-parallax.x * 20}px, ${-parallax.y * 20}px, 0)`,
        }}
      />

      {/* İçerik */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}