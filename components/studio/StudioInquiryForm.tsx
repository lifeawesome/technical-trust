"use client";

import { FormEvent, useState } from "react";
import { trackStudioInquiry } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/content";
import { studio } from "@/lib/studio";
import styles from "./StudioInquiryForm.module.css";

type Status = "idle" | "loading" | "success" | "error";

const { contact } = studio;
const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(contact.mailtoSubject)}`;

export default function StudioInquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [situation, setSituation] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const honeypot = new FormData(form).get("company_website");

    try {
      const response = await fetch("/api/studio/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          situation,
          siteUrl: siteUrl || undefined,
          company_website: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Inquiry failed");
      }

      trackStudioInquiry();
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setSituation("");
      setSiteUrl("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successPanel} role="status">
        <span className={styles.successMark} aria-hidden="true">
          ✓
        </span>
        <p className={styles.successText}>{contact.success}</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="studio-company-website">Company website</label>
          <input
            id="studio-company-website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="studio-name">{contact.fields.name.label}</label>
          <input
            id="studio-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={100}
            placeholder={contact.fields.name.placeholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="studio-email">{contact.fields.email.label}</label>
          <input
            id="studio-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={contact.fields.email.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="studio-company">{contact.fields.company.label}</label>
          <input
            id="studio-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            maxLength={200}
            placeholder={contact.fields.company.placeholder}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="studio-situation">
            {contact.fields.situation.label}
          </label>
          <textarea
            id="studio-situation"
            name="situation"
            required
            rows={5}
            maxLength={4000}
            placeholder={contact.fields.situation.placeholder}
            value={situation}
            onChange={(event) => setSituation(event.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="studio-site">
            {contact.fields.siteUrl.label}
            <span className={styles.optional}>
              {" "}
              ({contact.fields.siteUrl.optional})
            </span>
          </label>
          <input
            id="studio-site"
            name="siteUrl"
            type="url"
            autoComplete="url"
            maxLength={500}
            placeholder={contact.fields.siteUrl.placeholder}
            value={siteUrl}
            onChange={(event) => setSiteUrl(event.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <button type="submit" disabled={status === "loading"} className={styles.button}>
          {status === "loading" ? (
            <span className={styles.spinner} aria-label="Submitting" />
          ) : (
            <>
              {contact.ctaLabel}
              <span className={styles.buttonArrow} aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>
      </form>

      <p className={styles.disclaimer}>
        <span className={styles.disclaimerDot} aria-hidden="true" />
        {contact.disclaimer}
      </p>

      {status === "error" ? (
        <p className={styles.error} role="alert">
          {contact.error}{" "}
          <a href={mailtoHref}>{contact.emailFallbackLabel} →</a>
        </p>
      ) : (
        <p className={styles.fallback}>
          <a href={mailtoHref}>{contact.emailFallbackLabel} →</a>
        </p>
      )}
    </div>
  );
}
