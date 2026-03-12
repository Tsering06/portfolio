import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_upd3576",    // your service ID
      "template_3xadohk",   // your template ID
      form.current,
      "rRhL5xvwo9iD7UWXY"   // your public key
    ).then(
      () => {
        alert("Message sent successfully!");
      },
      (error) => {
        alert("Failed to send message.");
        console.log(error);
      }
    );
  };

  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.title}>Contact Me</h2>

      <form ref={form} onSubmit={sendEmail} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          style={styles.input}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>
    </section>
  );
};

const styles = {
  section: {
    padding: "80px 20px",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "30px",
  },

  form: {
    maxWidth: "500px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  button: {
    padding: "10px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Contact;