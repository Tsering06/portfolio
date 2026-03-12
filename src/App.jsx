import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Skills   from "./components/Skills";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";
import "./index.css";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer style={{
        background: "#050A12",
        borderTop: "1px solid rgba(168,223,255,0.07)",
        padding: "28px 72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "rgba(216,238,248,0.25)",
      }}>
        <span>© {new Date().getFullYear()} Chhiring Lhamu Lama</span>
        <span style={{ color: "rgba(91,200,245,0.35)" }}>Built with React</span>
      </footer>
    </div>
  );
}