"use client";

import { FormEvent, useState } from "react";
import { subscribeForm } from "@/lib/content";
import styles from "./EmailCapture.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pageUrl: window.location.href,
          documentReferrer: document.referrer || undefined,
        }),
      });

      if (!response.ok) throw new Error("Subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.wrap}>
        <div className={styles.successPanel} role="status">
          <span className={styles.successMark} aria-hidden="true">
            ✓
          </span>
          <p className={styles.successText}>{subscribeForm.success}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.srOnly}>
            {subscribeForm.label}
          </label>
          <span className={`${styles.atMark} mono`} aria-hidden="true">
            @
          </span>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={subscribeForm.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className={styles.input}
          />
          <button type="submit" disabled={status === "loading"} className={styles.button}>
            {status === "loading" ? (
              <span className={styles.spinner} aria-label="Submitting" />
            ) : (
              <>
                {subscribeForm.button}
                <span className={styles.buttonArrow} aria-hidden="true">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      <p className={styles.disclaimer}>
        <span className={styles.disclaimerDot} aria-hidden="true" />
        {subscribeForm.disclaimer}
      </p>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {subscribeForm.error}
        </p>
      )}
    </div>
  );
}
