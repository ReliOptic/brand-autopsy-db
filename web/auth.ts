// NextAuth v5 (beta) configuration.
// Requires: `npm install next-auth@beta` (uses the `next-auth` package).
//
// Environment variables (set in web/.env.local):
//   AUTH_SECRET           — random 32-byte base64 string
//   AUTH_GOOGLE_ID        — Google OAuth client id
//   AUTH_GOOGLE_SECRET    — Google OAuth client secret
//   AUTH_RESEND_KEY       — Resend API key for magic-link email
//   AUTH_EMAIL_FROM       — Sender email for magic links

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM ?? "noreply@bautopsy.com",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
