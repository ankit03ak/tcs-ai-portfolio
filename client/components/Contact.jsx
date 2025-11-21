"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { sendContactMessage } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await sendContactMessage(form);
      setStatus({
        type: "success",
        message: "Thanks for reaching out! I’ll get back to you soon."
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.message ||
          "Something went wrong while sending your message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-slate-950">
      <div className="section-inner">
        <SectionHeading
          title="Get in touch"
          subtitle="Have a question about my work, want to collaborate, or just say hello? Drop a message and I’ll respond as soon as I can."
        />

        <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
          {/* Form */}
          <div className="glass p-6 md:p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Name<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500"
                  placeholder="Let me know how I can help"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Message<span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500 resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              {status.message && (
                <p
                  className={`text-xs ${
                    status.type === "success"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>

          {/* Side contact info */}
          <div className="space-y-4 text-sm text-slate-300">
            <div className="glass p-5">
              <h3 className="text-sm font-semibold mb-2 text-emerald-400">
                Contact details
              </h3>
              <p className="text-slate-300">
                Email:{" "}
                <a
                  href="mailto:vickyak1339@gmail.com"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  vickyak1339@gmail.com
                </a>
                <br />
                College:{" "}
                <a
                  href="mailto:ankit.2022ug1107@iiitranchi.ac.in"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  ankit.2022ug1107@iiitranchi.ac.in
                </a>
              </p>
              <p className="mt-2 text-slate-400">
                I&apos;m open to internships, freelance work, and interesting
                collaborations related to full-stack development and AI-powered
                web apps.
              </p>
            </div>

            <div className="glass p-5">
              <h3 className="text-sm font-semibold mb-2 text-emerald-400">
                Socials
              </h3>
              <div className="flex flex-wrap gap-3 text-xs">
                <a
                  href="https://github.com/ankit03ak"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400"
                >
                  GitHub
                </a>
                <a
                  href="http://www.linkedin.com/in/ankit-kumar-b2206436a"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400"
                >
                  LinkedIn
                </a>
                <a
                  href="https://t.me/nkitK"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400"
                >
                  Telegram
                </a>
                <a
                  href="https://wa.me/918726685833?text=Hello%20Developer%20:)"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
