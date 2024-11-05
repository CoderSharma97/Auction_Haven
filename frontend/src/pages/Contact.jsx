import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank you! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col items-center min-h-screen py-4 bg-gray-100">
      <div className="bg-white w-full max-w-3xl p-8 shadow-lg rounded-lg">
        <h3 className="text-custom-hover text-3xl font-semibold mb-6 text-center">
          Contact Us
        </h3>
        <form className="space-y-5" onSubmit={handleContactForm}>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] text-gray-600">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] text-gray-600">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] text-gray-600">Your Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] text-gray-600">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-hover"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[16px] text-gray-600">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-custom-hover resize-none"
              required
            />
          </div>

          <button
            className="w-full bg-custom-primary font-semibold hover:bg-custom-hover text-xl transition-all duration-300 py-3 rounded-lg text-white mt-4 shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
