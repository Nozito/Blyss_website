"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { Mail, Send, User } from "lucide-react";
import { LEGAL_EDITOR } from "@/lib/legal";

const fieldClass =
  "w-full border border-[var(--border)] rounded-2xl px-5 py-4 focus:outline-none focus:border-[var(--accent)] focus:ring-4 transition-all font-medium text-[var(--text)] placeholder:text-[var(--text-muted)]";
const fieldStyle = { background: "var(--bg-surface)", "--tw-ring-color": "var(--blyss-pink-light)" } as CSSProperties;
const labelClass = "text-sm font-bold text-[var(--text-muted)] ml-1 group-focus-within:text-[var(--accent)] transition-colors";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bodyLines = [message, "", `Nom : ${name}`, `Email : ${email}`];

    const mailto = `mailto:${LEGAL_EDITOR.contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group space-y-2">
          <label htmlFor="contact-name" className={labelClass}>
            Nom complet
          </label>
          <div className="relative">
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
              style={fieldStyle}
            />
            <User className="pointer-events-none absolute right-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-muted)]" />
          </div>
        </div>

        <div className="group space-y-2">
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              style={fieldStyle}
            />
            <Mail className="pointer-events-none absolute right-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--text-muted)]" />
          </div>
        </div>
      </div>

      <div className="group space-y-2">
        <label htmlFor="contact-subject" className={labelClass}>
          Sujet
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          placeholder="De quoi s'agit-il ?"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={fieldClass}
          style={fieldStyle}
        />
      </div>

      <div className="group space-y-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          required
          placeholder="Racontez-nous tout..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-none`}
          style={fieldStyle}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-lg font-bold text-white shadow-[var(--shadow-soft)] transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99]"
          style={{ background: "var(--accent)" }}
        >
          Envoyer le message
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
