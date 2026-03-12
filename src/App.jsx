import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <Navbar />

      <Hero
        name="Chhiring Lhamu Lama"
        title="Computer Engineering Student | AI Enthusiast"
      />

      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;