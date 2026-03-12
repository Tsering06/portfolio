import React from "react";

const Skills = () => {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Machine Learning",
    "Natural Language Processing",
    "Git"
  ];

  return (
    <section id="skills" style={styles.section}>
      <h2 style={styles.title}>My Skills</h2>

      <div style={styles.grid}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.card}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "80px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    maxWidth: "800px",
    margin: "auto",
  },

  card: {
    padding: "20px",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
};

export default Skills;