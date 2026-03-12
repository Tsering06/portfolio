import { useEffect, useRef } from "react";

const groups = [
  { id: "01", icon: "◈", cat: "Frontend",             skills: ["React", "JavaScript", "HTML5", "CSS3"] },
  { id: "02", icon: "◉", cat: "Backend & Tools",       skills: ["Python", "Git", "REST APIs", "Streamlit"] },
  { id: "03", icon: "◆", cat: "AI / Machine Learning", skills: ["Machine Learning", "Deep Learning", "NLP", "TensorFlow", "OpenCV", "MobileNetV2"] },
  { id: "04", icon: "◇", cat: "Concepts",              skills: ["Computer Vision", "PDF Parsing", "Data Analysis", "Model Training"] },
];

export default function Skills() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".rv").forEach((el, i) =>
        setTimeout(() => el.classList.add("visible"), i * 90)
      );
    }), { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .skills {
          background: var(--bg);
          padding: 120px 0;
          position: relative; overflow: hidden;
        }
        .skills-frost {
          position: absolute; bottom: -150px; right: -150px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(91,200,245,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        /* Watermark text */
        .skills-wm {
          position: absolute; top: 40px; right: -20px;
          font-family: var(--display); font-size: 16vw;
          font-weight: 900; text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1px rgba(91,200,245,0.04);
          pointer-events: none; white-space: nowrap;
          letter-spacing: 4px; user-select: none;
        }

        .skills-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 72px;
          position: relative; z-index: 1;
        }

        .skills-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 24px; margin-bottom: 60px;
        }
        .skills-label {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--blue); opacity: 0.75;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px;
        }
        .skills-label::before { content: '//'; opacity: 0.45; }
        .skills-title {
          font-family: var(--display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.9; letter-spacing: 2px;
          text-transform: uppercase;
        }
        .skills-title .ghost { color:transparent; -webkit-text-stroke:1.5px rgba(168,223,255,0.2); display:block; }
        .skills-title .solid { color:var(--silver); display:block; }
        .skills-big-num {
          font-family: var(--display); font-size: 5rem;
          color: transparent;
          -webkit-text-stroke: 1px rgba(91,200,245,0.18);
          letter-spacing: -2px; line-height: 1; flex-shrink: 0;
        }

        /* 2×2 grid */
        .skills-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--border2);
          border: 1px solid var(--border2);
        }

        .skill-card {
          background: var(--bg); padding: 36px;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .skill-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--ice), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s ease;
          box-shadow: 0 0 8px var(--blue);
        }
        .skill-card:hover { background: rgba(91,200,245,0.025); }
        .skill-card:hover::before { transform: scaleX(1); }

        .skill-card-id {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 3px; color: rgba(91,200,245,0.3);
          margin-bottom: 18px;
          display: flex; align-items: center; gap: 10px;
        }
        .skill-card-id::after { content:''; flex:1; height:1px; background:var(--border2); }

        .skill-card-head {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 22px;
        }
        .skill-card-icon { font-size: 18px; color: var(--blue); opacity: 0.7; }
        .skill-card-name {
          font-family: var(--display); font-size: 22px;
          font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; color: var(--silver);
        }

        .skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-pill {
          display: inline-block; padding: 6px 15px;
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 1px; text-transform: uppercase;
          color: var(--muted);
          border: 1px solid rgba(168,223,255,0.1);
          background: rgba(168,223,255,0.03);
          transition: border-color .25s, color .25s, background .25s, transform .2s;
          cursor: default;
        }
        .skill-pill:hover {
          border-color: rgba(91,200,245,0.4);
          color: var(--blue); background: rgba(91,200,245,0.06);
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .skills-inner { padding: 0 24px; }
          .skills-grid { grid-template-columns: 1fr; }
          .skills-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section id="skills" className="skills" ref={ref}>
        <div className="skills-frost" />
        <div className="skills-wm">Skills</div>
        <div className="skills-inner">
          <div className="skills-header">
            <div>
              <div className="rv skills-label">Expertise</div>
              <h2 className="rv skills-title">
                <span className="ghost">Tech</span>
                <span className="solid">Stack</span>
              </h2>
            </div>
            <div className="rv skills-big-num">14+</div>
          </div>

          <div className="rv skills-grid">
            {groups.map(g => (
              <div key={g.id} className="skill-card">
                <div className="skill-card-id">[ {g.id} ]</div>
                <div className="skill-card-head">
                  <span className="skill-card-icon">{g.icon}</span>
                  <span className="skill-card-name">{g.cat}</span>
                </div>
                <div className="skill-pills">
                  {g.skills.map((s, i) => <span key={i} className="skill-pill">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}