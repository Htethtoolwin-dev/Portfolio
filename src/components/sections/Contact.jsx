import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personal } from "../../data/personal";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(form.email)) newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!FORMSPREE_ID || FORMSPREE_ID === "your_formspree_id") {
      window.location.href = `mailto:${personal.email}?subject=Portfolio contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full min-h-11 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-base text-[var(--text-primary)] transition-all duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:-translate-y-px sm:text-sm";

  return (
    <section id="contact" className="scroll-mt-20 bg-[var(--bg-secondary)] py-16 sm:py-24">
      <div className="page-container">
        <SectionHeading title="Get In Touch" subtitle="Have a project in mind or just want to say hello? I'd love to hear from you." />
        <div className="mx-auto grid max-w-4xl gap-8 sm:gap-12 lg:grid-cols-5">
          <Reveal className="min-w-0 lg:col-span-2" delay={100}>
            <p className="leading-relaxed text-[var(--text-muted)]">I&apos;m currently open to new opportunities and collaborations. Whether you have a question or just want to connect, feel free to reach out.</p>
            <div className="mt-8 space-y-4">
              <a href={`mailto:${personal.email}`} className="flex min-h-11 items-center gap-3 break-all text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
                <Mail size={18} className="shrink-0 text-[var(--accent)]" /> {personal.email}
              </a>
              {personal.social.github && (
                <a href={personal.social.github} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
                  <GitHubIcon size={18} className="shrink-0 text-[var(--accent)]" /> GitHub
                </a>
              )}
              {personal.social.linkedin && (
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
                  <LinkedInIcon size={18} className="shrink-0 text-[var(--accent)]" /> LinkedIn
                </a>
              )}
            </div>
          </Reveal>
          <Reveal as="form" onSubmit={handleSubmit} noValidate className="space-y-5 lg:col-span-3" aria-label="Contact form" delay={200}>
            {["name", "email"].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="mb-1.5 block text-sm font-medium capitalize">{field}</label>
                <input id={field} name={field} type={field === "email" ? "email" : "text"} value={form[field]} onChange={handleChange} className={inputClass} placeholder={field === "email" ? "you@example.com" : "Your name"} aria-invalid={!!errors[field]} />
                {errors[field] && <p className="mt-1 text-sm text-red-500" role="alert">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Your message..." aria-invalid={!!errors.message} />
              {errors.message && <p className="mt-1 text-sm text-red-500" role="alert">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={status === "loading"} className="btn-shine w-full sm:w-auto">
              <Send size={16} /> {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
            {status === "success" && <p className="text-sm text-emerald-500" role="status">Message sent successfully! I&apos;ll get back to you soon.</p>}
            {status === "error" && <p className="text-sm text-red-500" role="alert">Something went wrong. Please try again or email me directly.</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
