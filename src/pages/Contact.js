import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      
      <div className="contact-container">

        {/* LEFT SIDE (IMAGE / INFO) */}
        <div className="contact-left">
          <h2>Let’s Talk 👋</h2>
          <p>
            Have a question, idea, or just want to connect?  
            Fill the form and I’ll get back to you.
          </p>

          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="contact"
          />
        </div>

        {/* RIGHT SIDE (FORM CARD) */}
        <div className="contact-right">
          <form className="contact-form">

            <h3>Contact Us</h3>

            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />

            <textarea
              placeholder="Your Message..."
              rows="5"
              required
            />

            <button type="submit">Send Message 🚀</button>

          </form>
        </div>

      </div>

    </div>
  );
}

export default Contact;