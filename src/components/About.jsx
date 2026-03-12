import { useEffect, useRef } from "react";
import profile from "../assets/myphoto.jpg";

const stats = [
  { val: "4+", label: "Projects Built" },
  { val: "2+", label: "Years Learning" },
  { val: "8+", label: "Technologies" },
  { val: "AI",  label: "Primary Focus" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".rv").forEach((el, i) =>
        setTimeout(() => el.classList.add("visible"), i * 100)
      );
    }), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about {
          background: var(--bg2);
          padding: 120px 0;
          position: relative; overflow: hidden;
        }
        .about-frost {
          position:absolute; top:-200px; left:-200px;
          width:600px; height:600px; border-radius:50%;
          background:radial-gradient(circle,rgba(91,200,245,0.05) 0%,transparent 65%);
          pointer-events:none;
        }

        .about-inner {
          max-width:1160px; margin:0 auto; padding:0 72px;
          display:grid; grid-template-columns:1fr 1.15fr;
          gap:80px; align-items:center;
          position:relative; z-index:1;
        }

        /* ══════════════════════════
           GLITCH IMAGE — same layers
           as hero had
        ══════════════════════════ */
        .about-img-col { position:relative; }

        .about-glitch-frame {
          position:relative;
          clip-path:polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,28px 100%,0 calc(100% - 28px));
          overflow:hidden;
        }

        /* Main photo */
        .about-glitch-frame img {
          width:100%; aspect-ratio:3/4;
          object-fit:cover; object-position:top; display:block;
          filter:brightness(0.85) contrast(1.1) saturate(0.65);
          position:relative; z-index:1;
          transition:filter 0.5s;
        }
        .about-glitch-frame:hover img {
          filter:brightness(0.92) contrast(1.05) saturate(0.85);
        }

        /* Ice blue tint */
        .about-glitch-tint {
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(180deg,rgba(91,200,245,0.07) 0%,transparent 40%,rgba(5,10,18,0.45) 100%);
          pointer-events:none;
        }

        /* Chromatic aberration — red channel */
        .about-glitch-r {
          position:absolute; inset:0; z-index:3;
          background-image:var(--about-photo);
          background-size:cover; background-position:top;
          mix-blend-mode:screen;
          filter:brightness(0.85) contrast(1.1) saturate(0.65);
          opacity:0;
          animation:aboutGlitchR 7s ease-in-out infinite;
        }
        /* Chromatic aberration — blue channel */
        .about-glitch-b {
          position:absolute; inset:0; z-index:3;
          background-image:var(--about-photo);
          background-size:cover; background-position:top;
          mix-blend-mode:screen;
          filter:brightness(0.85) contrast(1.1) saturate(0) hue-rotate(180deg);
          opacity:0;
          animation:aboutGlitchB 7s ease-in-out infinite;
        }

        @keyframes aboutGlitchR {
          0%,88%,100% { opacity:0; transform:translate(0,0); }
          90%  { opacity:0.5; transform:translate(-4px,1px); clip-path:inset(28% 0 52% 0); }
          91%  { opacity:0; }
          94%  { opacity:0.38; transform:translate(3px,-2px); clip-path:inset(58% 0 12% 0); }
          95%  { opacity:0; }
        }
        @keyframes aboutGlitchB {
          0%,89%,100% { opacity:0; transform:translate(0,0); }
          91%  { opacity:0.45; transform:translate(4px,-1px); clip-path:inset(14% 0 66% 0); }
          92%  { opacity:0; }
          95%  { opacity:0.32; transform:translate(-3px,2px); clip-path:inset(68% 0 8% 0); }
          96%  { opacity:0; }
        }

        /* Horizontal tear lines */
        .about-glitch-tear {
          position:absolute; z-index:4; pointer-events:none;
          left:0; right:0; height:2px;
          background:rgba(168,223,255,0.7);
          opacity:0;
          animation:aboutTear 7s ease-in-out infinite;
        }
        .about-glitch-tear:nth-child(1) { top:30%; animation-delay:0s; }
        .about-glitch-tear:nth-child(2) { top:60%; animation-delay:.07s; height:1px; background:rgba(91,200,245,0.5); }
        .about-glitch-tear:nth-child(3) { top:47%; animation-delay:.03s; height:3px; }

        @keyframes aboutTear {
          0%,88%,100% { opacity:0; transform:translateX(0); }
          90%  { opacity:1;  transform:scaleX(1.02) translateX(-4px); }
          91%  { opacity:0; }
          94%  { opacity:.7; transform:scaleX(.97) translateX(6px); }
          95%  { opacity:0; }
        }

        /* CRT scanlines */
        .about-glitch-scan {
          position:absolute; inset:0; z-index:5; pointer-events:none;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(5,10,18,0.16) 2px,rgba(5,10,18,0.16) 4px);
          animation:scanShift 8s linear infinite;
        }
        @keyframes scanShift { from{background-position:0 0} to{background-position:0 100px} }

        /* Noise flicker */
        .about-glitch-noise {
          position:absolute; inset:0; z-index:6; pointer-events:none; opacity:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          background-size:128px 128px; mix-blend-mode:overlay;
          animation:noiseFlick 7s ease-in-out infinite;
        }
        @keyframes noiseFlick {
          0%,86%,100%{opacity:0}89%{opacity:.22}90%{opacity:0}93%{opacity:.14}94%{opacity:0}
        }

        /* Corner HUD brackets */
        .about-glitch-c {
          position:absolute; width:16px; height:16px;
          pointer-events:none; z-index:7;
        }
        .about-glitch-c-tl{top:-1px;left:-1px;border-top:2px solid var(--blue);border-left:2px solid var(--blue);}
        .about-glitch-c-tr{top:-1px;right:29px;border-top:2px solid var(--blue);border-right:2px solid var(--blue);}
        .about-glitch-c-bl{bottom:29px;left:-1px;border-bottom:2px solid var(--blue);border-left:2px solid var(--blue);}
        .about-glitch-c-br{bottom:-1px;right:-1px;border-bottom:2px solid var(--blue);border-right:2px solid var(--blue);}

        /* Animated border glow */
        .about-glitch-glow {
          position:absolute; inset:-1px;
          clip-path:polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,28px 100%,0 calc(100% - 28px));
          background:transparent;
          box-shadow:0 0 36px rgba(91,200,245,0.14);
          pointer-events:none; z-index:0;
          animation:glowFrame 4s ease-in-out infinite alternate;
        }
        @keyframes glowFrame {
          from{box-shadow:0 0 28px rgba(91,200,245,0.1);}
          to  {box-shadow:0 0 55px rgba(91,200,245,0.22),inset 0 0 20px rgba(91,200,245,0.05);}
        }

        /* Info card bottom-right */
        .about-glitch-card {
          position:absolute; bottom:-16px; right:-16px;
          background:rgba(5,10,18,0.93);
          border:1px solid var(--border);
          backdrop-filter:blur(12px);
          padding:14px 20px;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
          z-index:8; min-width:160px;
        }
        .about-glitch-card-val {
          font-family:var(--display); font-size:30px;
          color:var(--blue); line-height:1;
        }
        .about-glitch-card-lbl {
          font-family:var(--mono); font-size:9px;
          letter-spacing:2px; text-transform:uppercase;
          color:var(--muted); margin-top:4px;
        }

        /* ── Text column ── */
        .about-sec-label {
          font-family:var(--mono); font-size:10px;
          letter-spacing:4px; text-transform:uppercase;
          color:var(--blue); opacity:.75;
          display:flex; align-items:center; gap:8px; margin-bottom:18px;
        }
        .about-sec-label::before { content:'//'; opacity:.45; }

        .about-title {
          font-family:var(--display);
          font-size:clamp(3rem,5.5vw,5.5rem);
          line-height:.9; letter-spacing:2px;
          text-transform:uppercase; margin-bottom:28px;
        }
        .about-title .ghost {
          display:block; color:transparent;
          -webkit-text-stroke:1.5px rgba(168,223,255,0.2);
        }
        .about-title .solid { display:block; color:var(--silver); }

        .about-body {
          font-family:var(--body); font-size:16px;
          font-weight:400; line-height:1.8; color:var(--muted); margin-bottom:16px;
        }
        .about-body strong { color:var(--silver); font-weight:600; }

        .about-rule {
          height:1px; margin:28px 0;
          background:linear-gradient(90deg,var(--border),transparent);
        }

        .about-stats {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:1px; background:var(--border2); border:1px solid var(--border2);
        }
        .about-stat {
          background:var(--bg2); padding:18px 14px;
          text-align:center; transition:background .2s;
        }
        .about-stat:hover { background:rgba(91,200,245,0.04); }
        .about-stat-val {
          font-family:var(--display); font-size:30px;
          color:var(--blue); line-height:1;
        }
        .about-stat-lbl {
          font-family:var(--mono); font-size:8px;
          letter-spacing:2px; text-transform:uppercase;
          color:var(--muted); margin-top:5px;
        }

        @media(max-width:900px){
          .about-inner { grid-template-columns:1fr; padding:0 24px; gap:52px; }
          .about-stats { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      <section id="about" className="about" ref={ref}>
        <div className="about-frost" />
        <div className="about-inner">

          {/* ── Glitch Image ── */}
          <div className="about-img-col rv">
            <div className="about-glitch-frame">
              <img src={profile} alt="Chhiring Lhamu Lama" />
              <div className="about-glitch-tint" />
              <div className="about-glitch-r" style={{ backgroundImage:`url(${profile})` }} />
              <div className="about-glitch-b" style={{ backgroundImage:`url(${profile})` }} />
              <div className="about-glitch-tear" />
              <div className="about-glitch-tear" />
              <div className="about-glitch-tear" />
              <div className="about-glitch-scan" />
              <div className="about-glitch-noise" />
              <div className="about-glitch-c about-glitch-c-tl" />
              <div className="about-glitch-c about-glitch-c-tr" />
              <div className="about-glitch-c about-glitch-c-bl" />
              <div className="about-glitch-c about-glitch-c-br" />
            </div>
            <div className="about-glitch-glow" />
            <div className="about-glitch-card">
              <div className="about-glitch-card-val">KEC</div>
              <div className="about-glitch-card-lbl">Computer Eng.</div>
            </div>
          </div>

          {/* ── Text ── */}
          <div>
            <div className="rv about-sec-label">About Me</div>
            <h2 className="rv about-title">
              <span className="ghost">Building</span>
              <span className="solid">the Future</span>
            </h2>
            <p className="rv about-body">
              I'm <strong>Chhiring Lhamu Lama</strong>, a Computer Engineering student at
              Kantipur Engineering College. I build modern web apps that solve real-world problems.
            </p>
            <p className="rv about-body">
              My stack spans <strong>React, Python</strong>, and <strong>Machine Learning</strong>.
              I'm especially drawn to <strong>NLP</strong> and AI-powered applications.
            </p>
            <p className="rv about-body">
              Goal: become an <strong>AI Engineer</strong> building systems that genuinely matter.
            </p>
            <div className="rv about-rule" />
            <div className="rv about-stats">
              {stats.map((s, i) => (
                <div key={i} className="about-stat">
                  <div className="about-stat-val">{s.val}</div>
                  <div className="about-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}