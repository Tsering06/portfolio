import React from "react";
import profile from "../assets/myphoto.jpg";

const About = () => {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        
        <div style={styles.imageContainer}>
          <img
            src={profile}
            alt="Chhiring Lhamu Lama"
            style={styles.image}
          />
        </div>

        <div style={styles.textContainer}>
          <h2 style={styles.title}>About Me</h2>

          <p style={styles.text}>
            Hello! I'm <strong>Chhiring Lhamu Lama</strong>, a Computer
            Engineering student at Kantipur Engineering College. I enjoy
            building modern web applications that solve real-world problems.
          </p>

          <p style={styles.text}>
            My technical experience includes <strong>React, Python and
            Machine Learning</strong>. I am particularly interested in
            Artificial Intelligence, specially Natural Language Processing
            (NLP) and AI-powered web applications.
          </p>

          <p style={styles.text}>
            My goal is to become an <strong>AI Engineer</strong> and contribute
            to develop impactful machine learning systems.
          </p>

          <h3 style={styles.subtitle}>Projects</h3>
          <ul style={styles.list}>
            <li>Mask Detection Model</li>
            <li>Student Management system</li>
            <li>Personal Portfolio Website</li>
            <li>Resume Analyzer and job matcher</li>
          </ul>

          <h3 style={styles.subtitle}>Skills</h3>
          <ul style={styles.list}>
            <li>React</li>
            <li>Python</li>
            <li>Machine Learning</li>
            <li>Natural Language Processing (NLP)</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#f9f9f9",
  },
  container: {
    maxWidth: "1100px",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "40px",
  },
  imageContainer: {
    flex: "1",
    textAlign: "center",
  },
  image: {
  width: "350px",
  height: "350px",
  objectFit: "contain",
  borderRadius: "50%",
  border: "4px solid #ddd",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  },
  textContainer: {
    flex: "2",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  subtitle: {
    marginTop: "20px",
  },
  text: {
    lineHeight: "1.7",
    marginBottom: "15px",
  },
  list: {
    paddingLeft: "20px",
  },
};

export default About;

