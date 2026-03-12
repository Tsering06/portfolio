import React from "react";

const Contact = () => {
  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.title}>Contact Me</h2>

      <p style={styles.subtitle}>
        Feel free to reach out if you want to collaborate or have any questions.
      </p>

      <div style={styles.container}>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Your name"
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Your email"
            style={styles.input}
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>

        <div style={styles.info}>
          <h3>Connect With Me</h3>
          <p>Email: chhiringlhamu61@gmail.com</p>
          {/* Optional: add social links here */}
        </div>
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
    marginBottom: "10px",
  },

  subtitle: {
    marginBottom: "40px",
    color: "#555",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    maxWidth: "900px",
    margin: "auto",
  },

  form: {
    flex: "1",
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  info: {
    flex: "1",
    minWidth: "250px",
    textAlign: "left",
  },
};

export default Contact;