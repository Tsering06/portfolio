import { useState, useEffect } from "react";

const LINKS = [
  { href: "#hero",     id: "hero",     label: "Home" },
  { href: "#about",    id: "about",    label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#skills",   id: "skills",   label: "Skills" },
  { href: "#contact",  id: "contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("hero");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let current = "hero";
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 52px;
          transition: background 0.45s, border-color 0.45s, backdrop-filter 0.45s;
        }
        .nav.scrolled {
          background: rgba(5,10,18,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }

        /* Logo */
        .nav-logo {
          font-family: var(--display);
          font-size: 26px; letter-spacing: 3px;
          text-transform: uppercase; text-decoration: none;
          color: var(--silver);
          display: flex; align-items: center; gap: 0;
          line-height: 1;
          transition: color 0.2s;
        }
        .nav-logo-sep {
          width: 6px; height: 6px;
          background: var(--blue);
          border-radius: 50%;
          margin: 0 3px 4px;
          box-shadow: 0 0 10px var(--blue);
          display: inline-block;
        }

        /* Links */
        .nav-links {
          list-style: none; display: flex; align-items: center; gap: 2px;
        }
        .nav-links a {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          font-family: var(--body); font-size: 13px;
          font-weight: 500; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--muted);
          text-decoration: none; border-radius: 2px;
          position: relative;
          transition: color 0.25s;
        }
        .nav-links a::after {
          content: '';
          position: absolute; bottom: 4px; left: 16px; right: 16px;
          height: 1px; background: var(--blue);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
          box-shadow: 0 0 5px var(--blue);
        }
        .nav-links a:hover { color: var(--silver); }
        .nav-links a:hover::after { transform: scaleX(1); }
        .nav-links a.active { color: var(--blue); }
        .nav-links a.active::after { transform: scaleX(1); }

        .nav-num { font-family: var(--mono); font-size: 8px; color: rgba(91,200,245,0.4); }

        /* Burger */
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .nav-burger span {
          display: block; width: 22px; height: 1.5px;
          background: var(--silver);
          transition: transform .3s, opacity .3s;
        }
        .nav-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; }
        .nav-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Drawer */
        .nav-drawer {
          display: none; position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(5,10,18,0.97);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
          flex-direction: column;
          opacity: 0; transform: translateY(-8px); pointer-events: none;
          transition: opacity .3s, transform .3s; z-index: 999;
          padding: 8px 0 16px;
        }
        .nav-drawer.open { opacity:1; transform:translateY(0); pointer-events:all; }
        .nav-drawer a {
          padding: 14px 28px; font-family: var(--body);
          font-size: 14px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--muted); text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex; align-items: center; gap: 12px;
          transition: color .2s;
        }
        .nav-drawer a:hover { color: var(--blue); }
        .nav-drawer a.active { color: var(--blue); }
        .nav-drawer a:last-child { border: none; }

        @media (max-width: 860px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }
          .nav-burger { display: flex; }
          .nav-drawer { display: flex; }
        }
      `}</style>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          CL<span className="nav-logo-sep" />
        </a>

        <ul className="nav-links">
          {LINKS.map(({ href, id, label }, i) => (
            <li key={id}>
              <a href={href} className={active === id ? "active" : ""}>
                <span className="nav-num">0{i+1}</span>{label}
              </a>
            </li>
          ))}
        </ul>

        <button className={`nav-burger${open ? " open" : ""}`} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-drawer${open ? " open" : ""}`}>
        {LINKS.map(({ href, id, label }, i) => (
          <a key={id} href={href} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>
            <span style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"rgba(91,200,245,0.4)" }}>0{i+1}</span>
            {label}
          </a>
        ))}
      </div>
    </>
  );
}