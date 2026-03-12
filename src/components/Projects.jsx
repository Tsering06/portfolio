import React from "react";

const Projects = () => {

  const projects = [
    {
      title: "Student Management system",
      description:
        "Comprehensive platform to manage student data efficiently including student's profile,course, enrollment etc",
      tech: "Python, Deep Learning",
      github: "https://github.com/Tsering06/Student-managementsystem.git"
    },

    {
      title: "Mask Detection Model",
      description:
        "A deep learning model that detects whether a person is wearing a face mask or not using computer vision.",
      tech: "Python,TensorFlow / Keras,MobileNetV2,OpenCV,NumPy",
      github: "https://github.com/Tsering06/Face-mask-detection-using-mobilenetv2.git"
    },

    {
      title: "Resume analyzer and job matcher",
      description:
        "Built an AI-powered resume analyzer using Python, NLP and PDF parsing that reads resume PDFs, extracts skills and experience, matches resumes against job descriptions and outputs match percentages, skill gaps and recommendations, enabling faster, data-driven recruitment",
      tech: "Python,Streamlit,NumPy",
      github: "https://github.com/Tsering06/Resume-analyzer-and-job-matcher.git"
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A responsive portfolio website built with React to showcase my skills and projects.",
      tech: "React, HTML, CSS",
    }
  ];

  return (
    <section id="projects" style={styles.section}>
      <h2 style={styles.title}>My Projects</h2>

      <div style={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} style={styles.card}>
            <h3>{project.title}</h3>

            <p style={styles.description}>{project.description}</p>

            <p style={styles.tech}>
              <strong>Tech:</strong> {project.tech}
            </p>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={styles.button}
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1000px",
    margin: "auto",
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "left",
  },

  description: {
    margin: "10px 0",
    lineHeight: "1.6",
  },

  tech: {
    marginBottom: "15px",
    color: "#555",
  },

  button: {
    textDecoration: "none",
    backgroundColor: "#111",
    color: "white",
    padding: "8px 15px",
    borderRadius: "6px",
    fontSize: "14px",
  },
};

export default Projects;