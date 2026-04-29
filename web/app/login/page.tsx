"use client";

// Sign-in page. Renders Google OAuth and Resend magic-link options.
// Requires: `npm install next-auth@beta`.

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, type CSSProperties, type FormEvent } from "react";
import { T } from "@/components/ui-primitives";

type Method = "choice" | "email";

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "calc(100vh - 48px)",
  padding: "80px 24px",
  background: T.bg,
};

const cardStyle: CSSProperties = {
  width: "100%",
  maxWidth: 420,
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const headingStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 28,
  fontWeight: 600,
  color: T.textBright,
  letterSpacing: "-0.01em",
  margin: 0,
};

const subtitleStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 14,
  color: T.textMuted,
  margin: 0,
};

const buttonBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  width: "100%",
  height: 44,
  borderRadius: 4,
  cursor: "pointer",
  fontFamily: T.mono,
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  border: `1px solid ${T.border}`,
  background: T.surface,
  color: T.textBright,
  transition: "background 120ms ease",
};

const primaryButton: CSSProperties = {
  ...buttonBase,
  background: T.accent,
  borderColor: T.accent,
  color: T.bg,
};

const inputStyle: CSSProperties = {
  width: "100%",
  height: 44,
  padding: "0 12px",
  borderRadius: 4,
  border: `1px solid ${T.border}`,
  background: T.surface,
  color: T.textBright,
  fontFamily: T.mono,
  fontSize: 13,
  outline: "none",
};

const dividerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontFamily: T.mono,
  fontSize: 10,
  color: T.textDim,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const linkStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 11,
  color: T.accentBright,
  textDecoration: "none",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
};

const footerStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 11,
  color: T.textMuted,
  textAlign: "center",
  lineHeight: 1.6,
};

const GoogleIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

export default function LoginPage(): JSX.Element {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/dashboard";
  const errorParam = searchParams?.get("error") ?? null;

  const [method, setMethod] = useState<Method>("choice");
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleGoogle(): Promise<void> {
    setSubmitting(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error(
        JSON.stringify({
          event: "auth.google.error",
          message: err instanceof Error ? err.message : "unknown",
        }),
      );
      setFeedback("Google sign-in failed. Try again.");
      setSubmitting(false);
    }
  }

  async function handleEmail(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setFeedback(null);
    try {
      await signIn("resend", { email, callbackUrl });
      setFeedback("Magic link sent. Check your inbox.");
    } catch (err) {
      console.error(
        JSON.stringify({
          event: "auth.resend.error",
          message: err instanceof Error ? err.message : "unknown",
        }),
      );
      setFeedback("Could not send magic link. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              background: T.accent,
              borderRadius: 3,
              boxShadow: `0 0 12px ${T.accent}80`,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: T.textBright,
            }}
          >
            BAUTOPSY
          </span>
        </Link>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h1 style={headingStyle}>Sign in</h1>
          <p style={subtitleStyle}>Access brand intelligence reports</p>
        </div>

        {errorParam && (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 4,
              border: `1px solid ${T.error}40`,
              background: `${T.error}12`,
              color: T.error,
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.04em",
            }}
          >
            Authentication error: {errorParam}
          </div>
        )}

        {method === "choice" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={submitting}
              style={buttonBase}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div style={dividerStyle}>
              <span
                style={{ flex: 1, height: 1, background: T.border }}
                aria-hidden
              />
              <span>or</span>
              <span
                style={{ flex: 1, height: 1, background: T.border }}
                aria-hidden
              />
            </div>

            <button
              type="button"
              onClick={() => setMethod("email")}
              style={buttonBase}
            >
              Sign in with email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleEmail}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <label
              htmlFor="email"
              style={{
                fontFamily: T.mono,
                fontSize: 10,
                color: T.textMuted,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <button
              type="submit"
              disabled={submitting || !email}
              style={primaryButton}
            >
              {submitting ? "Sending…" : "Send magic link →"}
            </button>
            <button
              type="button"
              onClick={() => setMethod("choice")}
              style={linkStyle}
            >
              ← Back to all options
            </button>
          </form>
        )}

        {feedback && (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 4,
              border: `1px solid ${T.border}`,
              background: T.surface,
              color: T.textSecondary,
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.04em",
            }}
          >
            {feedback}
          </div>
        )}

        <p style={footerStyle}>
          By signing in, you agree to our{" "}
          <Link
            href="/terms"
            style={{ color: T.textSecondary, textDecoration: "underline" }}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            style={{ color: T.textSecondary, textDecoration: "underline" }}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
