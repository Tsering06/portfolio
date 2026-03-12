import { useEffect, useRef } from "react";

/* ════════════════════════════════
   Particle Network Canvas
════════════════════════════════ */
function ParticleNet() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    const MOUSE = { x: -9999, y: -9999 };
    const COUNT = 72;
    const MAX_D = 130;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      MOUSE.x = e.clientX - r.left;
      MOUSE.y = e.clientY - r.top;
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => { MOUSE.x = -9999; MOUSE.y = -9999; });

    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * (canvas.offsetWidth  || 500),
      y:  Math.random() * (canvas.offsetHeight || 500),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.6 + 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      animId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      pts.forEach(p => {
        p.phase += 0.018;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Mouse repulsion
        const mdx = p.x - MOUSE.x, mdy = p.y - MOUSE.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 90) {
          const f = (90 - md) / 90 * 0.55;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.2) { p.vx = (p.vx / spd) * 1.2; p.vy = (p.vy / spd) * 1.2; }

        const a = 0.5 + Math.sin(p.phase) * 0.28;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(p.phase) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91,200,245,${a})`;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = "rgba(91,200,245,0.55)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Edges
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_D) {
            const a = (1 - d / MAX_D) * 0.32;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(168,223,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      pts.forEach(p => {
        const dx = p.x - MOUSE.x, dy = p.y - MOUSE.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          const a = (1 - d / 150) * 0.65;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(MOUSE.x, MOUSE.y);
          ctx.strokeStyle = `rgba(91,200,245,${a})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      });
    };

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />;
}

/* ════════════════════════════════
   Hero
════════════════════════════════ */
export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll("[data-ani]").forEach((el, i) => {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(36px)";
      el.style.transition = `opacity 0.9s ease ${0.1 + i * 0.15}s, transform 0.9s ease ${0.1 + i * 0.15}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity   = "1";
        el.style.transform = "translateY(0)";
      }));
    });
  }, []);

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center;
          background: var(--bg);
          position: relative; overflow: hidden; padding-top: 70px;
        }
        .hero-frost {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background:
            radial-gradient(ellipse 70% 60% at 80% 50%, rgba(91,200,245,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 20%, rgba(168,223,255,0.05) 0%, transparent 60%);
        }
        .hero-dots {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image: radial-gradient(circle, rgba(168,223,255,0.08) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-vrule {
          position:absolute; top:0; bottom:0; left:50%; width:1px;
          background: linear-gradient(to bottom, transparent 0%, var(--border) 20%, var(--border) 80%, transparent 100%);
          pointer-events:none;
        }

        /* LEFT */
        .hero-left {
          position:relative; z-index:1;
          padding: 60px 52px 60px 80px;
          display:flex; flex-direction:column; gap:0;
        }
        .hero-chip {
          display:inline-flex; align-items:center; gap:8px;
          padding:6px 14px;
          background:rgba(91,200,245,0.08); border:1px solid rgba(91,200,245,0.2);
          border-radius:2px; font-family:var(--mono);
          font-size:10px; letter-spacing:3px; text-transform:uppercase;
          color:var(--blue); margin-bottom:32px; width:fit-content;
        }
        .hero-chip-dot {
          width:5px; height:5px; border-radius:50%;
          background:var(--blue); box-shadow:0 0 6px var(--blue);
          animation:chipBlink 2s ease-in-out infinite;
        }
        @keyframes chipBlink { 0%,100%{opacity:1}50%{opacity:0.2} }

        .hero-name {
          font-family:var(--display);
          font-size:clamp(4rem,7.5vw,8rem); line-height:0.88;
          letter-spacing:3px; text-transform:uppercase;
          color:var(--silver); margin-bottom:6px;
        }
        .hero-name-first { display:block; }
        .hero-name-last {
          display:block; color:transparent;
          -webkit-text-stroke:1.5px rgba(168,223,255,0.35); letter-spacing:4px;
        }
        .hero-rule {
          width:56px; height:1px;
          background:linear-gradient(90deg, var(--blue), transparent);
          margin:28px 0;
        }
        .hero-role {
          font-family:var(--mono); font-size:11px;
          letter-spacing:2.5px; text-transform:uppercase;
          color:var(--muted); margin-bottom:20px;
        }
        .hero-role span { color:var(--ice); }
        .hero-bio {
          font-family:var(--body); font-size:16px;
          font-weight:400; line-height:1.8; color:var(--muted);
          max-width:420px; margin-bottom:44px;
          padding-left:16px; border-left:1.5px solid rgba(91,200,245,0.25);
        }
        .hero-bio strong { color:var(--silver); font-weight:600; }

        .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .btn-ice {
          display:inline-flex; align-items:center; gap:10px;
          padding:14px 32px;
          background:linear-gradient(135deg,#5BC8F5,#A8DFFF); color:#050A12;
          font-family:var(--body); font-size:13px; font-weight:700;
          letter-spacing:2px; text-transform:uppercase;
          border:none; cursor:pointer; text-decoration:none;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
          box-shadow:0 0 24px rgba(91,200,245,0.3),0 4px 20px rgba(0,0,0,0.4);
          transition:box-shadow .25s,transform .2s;
        }
        .btn-ice:hover { transform:translateY(-2px); box-shadow:0 0 44px rgba(91,200,245,0.5),0 8px 28px rgba(0,0,0,0.5); }
        .btn-ghost-ice {
          display:inline-flex; align-items:center; gap:10px;
          padding:13px 28px; background:transparent; color:var(--silver);
          font-family:var(--body); font-size:13px; font-weight:600;
          letter-spacing:2px; text-transform:uppercase;
          border:1px solid var(--border); cursor:pointer; text-decoration:none;
          clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
          transition:border-color .3s,color .3s,background .3s;
        }
        .btn-ghost-ice:hover { border-color:rgba(91,200,245,0.5); color:var(--blue); background:rgba(91,200,245,0.05); }

        .hero-scroll {
          position:absolute; bottom:36px; left:80px; z-index:2;
          display:flex; align-items:center; gap:12px;
          font-family:var(--mono); font-size:9px;
          letter-spacing:3px; text-transform:uppercase;
          color:rgba(216,238,248,0.2);
        }
        .hero-scroll-bar {
          width:36px; height:1px;
          background:linear-gradient(90deg,var(--blue),transparent);
          animation:scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%,100%{opacity:0.4}50%{opacity:1} }

        /* RIGHT — Particle */
        .hero-right {
          position:relative; z-index:1; height:100vh;
          display:flex; align-items:center; justify-content:center;
        }
        .pnet-box {
          position:relative;
          width:min(520px,90%); height:min(520px,68vh);
        }
        /* Fade edges with vignette */
        .pnet-box::after {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 72% 72% at 50% 50%, transparent 38%, var(--bg) 100%);
          pointer-events:none; z-index:2;
        }
        .pnet-glow {
          position:absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:220px; height:220px; border-radius:50%;
          background:radial-gradient(circle, rgba(91,200,245,0.11) 0%, transparent 70%);
          filter:blur(22px); pointer-events:none; z-index:0;
          animation:glowPulse 4s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          from { opacity:.5; transform:translate(-50%,-50%) scale(1); }
          to   { opacity:1;  transform:translate(-50%,-50%) scale(1.18); }
        }
        .pnet-hud {
          position:absolute; bottom:16px; right:0;
          font-family:var(--mono); font-size:8px;
          letter-spacing:3px; text-transform:uppercase;
          color:rgba(91,200,245,0.32); text-align:right;
          pointer-events:none; z-index:3; line-height:1.9;
        }
        .pnet-hud-dot {
          display:inline-block; width:5px; height:5px;
          background:var(--blue); border-radius:50%;
          margin-right:5px; vertical-align:middle;
          animation:chipBlink 2s ease-in-out infinite;
        }

        @media(max-width:900px){
          .hero { grid-template-columns:1fr; }
          .hero-left { padding:90px 24px 36px; }
          .hero-vrule { display:none; }
          .hero-right { height:300px; }
          .pnet-box { width:100%; height:100%; }
          .hero-scroll { display:none; }
        }
      `}</style>

      <section id="hero" className="hero" ref={ref}>
        <div className="hero-frost" />
        <div className="hero-dots" />
        <div className="hero-vrule" />

        {/* LEFT */}
        <div className="hero-left">
          <div data-ani className="hero-chip">
            <span className="hero-chip-dot" /> Available for work
          </div>
          <h1 data-ani className="hero-name">
            <span className="hero-name-first">Chhiring</span>
            <span className="hero-name-last">Lhamu</span>
          </h1>
          <div data-ani className="hero-rule" />
          <p data-ani className="hero-role">
            <span>Computer Engineering</span> &nbsp;·&nbsp; AI Enthusiast
          </p>
          <p data-ani className="hero-bio">
            Building intelligent systems at the edge of <strong>web development</strong> and
            <strong> machine learning</strong>. Based in Kathmandu, Nepal.
          </p>
          <div data-ani className="hero-btns">
            <a href="#projects" className="btn-ice">View My Work →</a>
            <a href="#contact"  className="btn-ghost-ice">Get In Touch</a>
          </div>
        </div>

        {/* RIGHT — Particle Network */}
        <div className="hero-right">
          <div className="pnet-box" data-ani>
            <div className="pnet-glow" />
            <ParticleNet />
            <div className="pnet-hud">
              <div><span className="pnet-hud-dot" />Neural Network</div>
              <div>72 nodes · live</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-bar" />
          Scroll Down
        </div>
      </section>
    </>
  );
}