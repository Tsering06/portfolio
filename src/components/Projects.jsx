import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01", status: "Complete",
    title: "Student Management System",
    desc: "Comprehensive platform to manage student data — profiles, courses, and enrollment — with a clean, efficient interface.",
    tech: ["Python", "Deep Learning"],
    github: "https://github.com/Tsering06/Student-managementsystem.git",
  },
  {
    id: "02", status: "Complete",
    title: "Mask Detection Model",
    desc: "Real-time deep learning model using MobileNetV2 + OpenCV to classify mask usage from a live camera feed.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "MobileNetV2"],
    github: "https://github.com/Tsering06/Face-mask-detection-using-mobilenetv2.git",
  },
  {
    id: "03", status: "Complete",
    title: "Resume Analyzer & Job Matcher",
    desc: "AI tool that parses resume PDFs, extracts skills, scores against job descriptions, and outputs match percentages with gap analysis.",
    tech: ["Python", "Streamlit", "NLP", "NumPy"],
    github: "https://github.com/Tsering06/Resume-analyzer-and-job-matcher.git",
  },
  {
    id: "04", status: "Complete",
    title: "Personal Portfolio Website",
    desc: "Responsive modern portfolio built with React showcasing projects, skills, and professional journey.",
    tech: ["React", "HTML", "CSS"],
    github: "https://github.com/Tsering06",
  },
];

export default function Projects() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".rv").forEach((el, i) =>
        setTimeout(() => el.classList.add("visible"), i * 110)
      );
    }), { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .projects {
          background: var(--bg2);
          padding: 120px 0; position: relative; overflow: hidden;
        }
        .projects::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg, transparent, var(--border), transparent);
        }

        .proj-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 72px;
        }

        .proj-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 24px; margin-bottom: 56px;
        }
        .proj-label {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--blue); opacity: 0.75;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px;
        }
        .proj-label::before { content: '//'; opacity: 0.45; }
        .proj-title {
          font-family: var(--display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.9; letter-spacing: 2px; text-transform: uppercase;
        }
        .proj-title .ghost { color:transparent; -webkit-text-stroke:1.5px rgba(168,223,255,0.2); display:block; }
        .proj-title .solid { color:var(--silver); display:block; }

        /* List */
        .proj-list {
          display: flex; flex-direction: column;
          gap: 1px; background: var(--border2);
          border: 1px solid var(--border2);
        }

        .proj-row {
          background: var(--bg2); padding: 32px 36px;
          display: grid; grid-template-columns: 56px 1fr auto;
          gap: 28px; align-items: start;
          position: relative; overflow: hidden;
          transition: background 0.25s;
        }
        .proj-row::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, var(--blue), var(--ice));
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.35s ease;
          box-shadow: 2px 0 10px rgba(91,200,245,0.3);
        }
        .proj-row:hover { background: rgba(91,200,245,0.025); }
        .proj-row:hover::before { transform: scaleY(1); }

        .proj-id {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 2px; color: rgba(91,200,245,0.35);
          padding-top: 4px;
        }

        .proj-name {
          font-family: var(--display);
          font-size: clamp(1.4rem, 3vw, 2.1rem);
          font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--silver); margin-bottom: 10px;
          line-height: 1.1; transition: color 0.25s;
        }
        .proj-row:hover .proj-name { color: var(--blue); }

        .proj-desc {
          font-family: var(--body); font-size: 15px;
          font-weight: 400; line-height: 1.75;
          color: var(--muted); max-width: 540px; margin-bottom: 16px;
        }

        .proj-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .proj-tag {
          padding: 4px 13px;
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 1.5px; text-transform: uppercase;
          border: 1px solid rgba(91,200,245,0.15);
          color: rgba(91,200,245,0.5); background: rgba(91,200,245,0.04);
        }

        .proj-aside {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 10px; padding-top: 4px;
        }
        .proj-status {
          font-family: var(--mono); font-size: 8px;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--blue); opacity: 0.55;
          display: flex; align-items: center; gap: 6px;
        }
        .proj-status::before {
          content:''; width:5px; height:5px;
          background:var(--blue); border-radius:50%;
          opacity:0.7; animation: sdot 2.2s infinite;
        }
        @keyframes sdot { 0%,100%{opacity:.7}50%{opacity:.1} }

        .proj-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; font-family: var(--body);
          font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          border: 1px solid var(--border);
          color: var(--muted); text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          white-space: nowrap;
          transition: border-color .25s, color .25s, background .25s;
        }
        .proj-link:hover {
          border-color: rgba(91,200,245,0.45);
          color: var(--blue); background: rgba(91,200,245,0.05);
        }
        .proj-wip {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(216,238,248,0.18); white-space: nowrap;
        }

        @media (max-width: 860px) {
          .proj-inner { padding: 0 24px; }
          .proj-row { grid-template-columns: 40px 1fr; gap: 12px; }
          .proj-aside { grid-column: 1/-1; flex-direction: row; align-items: center; }
          .proj-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section id="projects" className="projects" ref={ref}>
        <div className="proj-inner">
          <div className="proj-header">
            <div>
              <div className="rv proj-label">Selected Work</div>
              <h2 className="rv proj-title">
                <span className="ghost">My</span>
                <span className="solid">Projects</span>
              </h2>
            </div>
          </div>
          <div className="proj-list">
            {projects.map(p => (
              <div key={p.id} className="rv proj-row">
                <div className="proj-id">[ {p.id} ]</div>
                <div>
                  <h3 className="proj-name">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tech.map((t, i) => <span key={i} className="proj-tag">{t}</span>)}
                  </div>
                </div>
                <div className="proj-aside">
                  <div className="proj-status">{p.status}</div>
                  {p.github
                    ? <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">GitHub ↗</a>
                    : <span className="proj-wip">— in progress</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}