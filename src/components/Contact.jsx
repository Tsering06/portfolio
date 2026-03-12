import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const meta = [
  { key: "Email",    val: "chiringlhamu61@gmail.com",      href: null },
  { key: "Phone",    val: "+977 9867533425",         href: null },
  { key: "Location", val: "Kathmandu, Nepal",        href: null },
  { key: "Status",   val: "Open to opportunities",   href: null },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Tsering06",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const form    = useRef();
  const ref     = useRef(null);
  const [status,  setStatus]  = useState(null);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".rv").forEach((el, i) =>
        setTimeout(() => el.classList.add("visible"), i * 110)
      );
    }), { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const send = (e) => {
    e.preventDefault(); setStatus("sending");
    emailjs.sendForm("service_upd3576","template_3xadohk",form.current,"rRhL5xvwo9iD7UWXY")
      .then(() => {
        setStatus("success");
        setTimeout(() => setStatus(null), 3000);
      }, () => {
        setStatus("error");
        setTimeout(() => setStatus(null), 3000);
      });
  };

  const fields = [
    { name:"name",    label:"Name",    type:"input",    ph:"Your full name" },
    { name:"email",   label:"Email",   type:"input",    ph:"your@email.com" },
    { name:"message", label:"Message", type:"textarea", ph:"Tell me about your project..." },
  ];

  return (
    <>
      <style>{`
        .contact {
          background: var(--bg);
          padding: 120px 0; position: relative; overflow: hidden;
        }
        .contact::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg, transparent, var(--border), transparent);
        }
        .contact-frost {
          position:absolute; top:-100px; right:-200px;
          width:600px; height:600px; border-radius:50%;
          background:radial-gradient(circle, rgba(91,200,245,0.05) 0%, transparent 65%);
          pointer-events:none;
        }

        .contact-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 72px;
          display: grid; grid-template-columns: 1fr 1.15fr;
          gap: 80px; align-items: start;
          position: relative; z-index: 1;
        }

        /* ── Left ── */
        .contact-label {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 4px; text-transform: uppercase;
          color: var(--blue); opacity: 0.75;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 18px;
        }
        .contact-label::before { content: '//'; opacity: 0.45; }

        .contact-title {
          font-family: var(--display);
          font-size: clamp(2.8rem, 5.5vw, 5.5rem);
          line-height: 0.9; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .contact-title .ghost { color:transparent; -webkit-text-stroke:1.5px rgba(168,223,255,0.2); display:block; }
        .contact-title .solid { color:var(--silver); display:block; }

        .contact-desc {
          font-family: var(--body); font-size: 15px;
          font-weight: 400; line-height: 1.8;
          color: var(--muted); max-width: 380px; margin-bottom: 28px;
        }

        /* Meta rows */
        .contact-meta {
          border: 1px solid var(--border2); margin-bottom: 24px;
        }
        .contact-meta-row {
          display: flex; align-items: center; gap: 16px;
          padding: 12px 20px;
          border-bottom: 1px solid var(--border2);
          background: var(--bg); transition: background 0.2s;
          text-decoration: none;
        }
        .contact-meta-row:last-child { border-bottom: none; }
        .contact-meta-row:hover { background: rgba(91,200,245,0.035); }
        .contact-meta-key {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(91,200,245,0.5); min-width: 72px; flex-shrink: 0;
        }
        .contact-meta-val {
          font-family: var(--body); font-size: 14px;
          font-weight: 500; color: var(--muted);
          transition: color 0.2s;
        }
        a.contact-meta-row:hover .contact-meta-val { color: var(--blue); }

        /* Social buttons */
        .contact-socials {
          display: flex; gap: 12px;
        }
        .contact-social-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 11px 20px;
          background: transparent;
          border: 1px solid var(--border2);
          color: var(--muted); text-decoration: none;
          font-family: var(--body); font-size: 13px; font-weight: 600;
          letter-spacing: 1.5px; text-transform: uppercase;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          transition: border-color 0.25s, color 0.25s, background 0.25s, box-shadow 0.25s;
          flex: 1; justify-content: center;
        }
        .contact-social-btn:hover {
          border-color: rgba(91,200,245,0.45);
          color: var(--blue); background: rgba(91,200,245,0.05);
          box-shadow: 0 0 16px rgba(91,200,245,0.1);
        }
        .contact-social-btn svg { flex-shrink: 0; }

        /* ── Form ── */
        .contact-form {
          display: flex; flex-direction: column;
          border: 1px solid var(--border2);
        }
        .cf-field {
          display: flex; flex-direction: column;
          border-bottom: 1px solid var(--border2);
          position: relative; transition: background 0.25s;
        }
        .cf-field:last-of-type { border-bottom: none; }
        .cf-field.focused { background: rgba(91,200,245,0.025); }
        .cf-lbl {
          font-family: var(--mono); font-size: 8px;
          letter-spacing: 3px; text-transform: uppercase;
          color: rgba(91,200,245,0.38); padding: 14px 22px 0;
          transition: color 0.25s;
        }
        .cf-field.focused .cf-lbl { color: var(--blue); }
        .cf-input, .cf-textarea {
          background: transparent; border: none;
          padding: 8px 22px 14px;
          font-family: var(--body); font-size: 15px;
          font-weight: 400; color: var(--silver);
          outline: none; width: 100%; resize: none;
          caret-color: var(--blue);
        }
        .cf-input::placeholder, .cf-textarea::placeholder {
          color: rgba(216,238,248,0.15);
        }
        .cf-field::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, var(--blue), var(--ice), transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
          box-shadow: 0 0 6px rgba(91,200,245,0.4);
        }
        .cf-field.focused::after { transform: scaleX(1); }
        .cf-submit {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 18px 24px;
          background: linear-gradient(135deg, #5BC8F5, #A8DFFF); color: #050A12;
          font-family: var(--body); font-size: 14px;
          font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border: none; cursor: pointer;
          box-shadow: 0 0 28px rgba(91,200,245,0.2);
          transition: box-shadow 0.25s, transform 0.2s, opacity 0.2s;
        }
        .cf-submit:hover:not(:disabled) {
          box-shadow: 0 0 48px rgba(91,200,245,0.4); transform: translateY(-1px);
        }
        .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cf-status {
          padding: 14px 22px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 1px;
          border-top: 1px solid var(--border2);
          animation: statusFade 3s ease forwards;
        }
        @keyframes statusFade {
          0%   { opacity: 1; }
          60%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .cf-status.success { color: #70e0a0; background: rgba(112,224,160,0.05); }
        .cf-status.error   { color: #f07070; background: rgba(240,112,112,0.05); }

        @media (max-width: 860px) {
          .contact-inner { grid-template-columns: 1fr; padding: 0 24px; gap: 48px; }
          .contact-socials { flex-direction: column; }
        }
      `}</style>

      <section id="contact" className="contact" ref={ref}>
        <div className="contact-frost" />
        <div className="contact-inner">

          {/* Left */}
          <div>
            <div className="rv contact-label">Get In Touch</div>
            <h2 className="rv contact-title">
              <span className="ghost">Let's</span>
              <span className="solid">Connect</span>
            </h2>
            <p className="rv contact-desc">
              Have a project or an idea? Or just want to say hi?
              My inbox is always open — I'll get back to you as soon as I can.
            </p>

            {/* Meta info rows */}
            <div className="rv contact-meta">
              {meta.map((m, i) =>
                m.href ? (
                  <a key={i} href={m.href} className="contact-meta-row">
                    <span className="contact-meta-key">{m.key}</span>
                    <span className="contact-meta-val">{m.val}</span>
                  </a>
                ) : (
                  <div key={i} className="contact-meta-row">
                    <span className="contact-meta-key">{m.key}</span>
                    <span className="contact-meta-val">{m.val}</span>
                  </div>
                )
              )}
            </div>

            {/* Social buttons */}
            <div className="rv contact-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="contact-social-btn">
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="rv">
            <form ref={form} onSubmit={send} className="contact-form">
              {fields.map(f => (
                <div key={f.name} className={`cf-field${focused === f.name ? " focused" : ""}`}>
                  <label className="cf-lbl">{f.label}</label>
                  {f.type === "textarea"
                    ? <textarea name={f.name} rows="5" placeholder={f.ph} className="cf-textarea"
                        required onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />
                    : <input type={f.name === "email" ? "email" : "text"} name={f.name}
                        placeholder={f.ph} className="cf-input"
                        required onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />
                  }
                </div>
              ))}
              <button type="submit" className="cf-submit" disabled={status === "sending"}>
                <span>{status === "sending" ? "Transmitting..." : "Send Message"}</span>
                <span>→</span>
              </button>
              {status === "success" && <div className="cf-status success">✓ Sent! I'll be in touch soon.</div>}
              {status === "error"   && <div className="cf-status error">✕ Failed. Please try again.</div>}
            </form>
          </div>

        </div>
      </section>
    </>
  );
}