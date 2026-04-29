// Protected account page (server component).
// Requires: `npm install next-auth@beta`.

import { redirect } from "next/navigation";
import type { CSSProperties } from "react";
import { auth, signOut } from "@/auth";
import { ApiKeyManager } from "@/components/api-key-manager";
import { T } from "@/components/ui-primitives";

export const metadata = {
  title: "Account",
};

const pageStyle: CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
  padding: "48px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 32,
};

const headerStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 11,
  color: T.textMuted,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  margin: 0,
};

const sectionTitleStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 20,
  fontWeight: 600,
  color: T.textBright,
  margin: 0,
};

const cardStyle: CSSProperties = {
  border: `1px solid ${T.border}`,
  borderRadius: 6,
  background: T.surface,
  padding: "20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const labelStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 10,
  color: T.textMuted,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const valueStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 13,
  color: T.textBright,
  letterSpacing: "0.02em",
};

const signOutButtonStyle: CSSProperties = {
  alignSelf: "flex-start",
  padding: "8px 14px",
  borderRadius: 4,
  border: `1px solid ${T.border}`,
  background: T.surface,
  color: T.textSecondary,
  fontFamily: T.mono,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

interface SessionUser {
  id?: string;
  email?: string | null;
  name?: string | null;
}

export default async function AccountPage(): Promise<JSX.Element> {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const user = session.user as SessionUser;
  const userId = user.id ?? user.email ?? "anonymous";

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={headerStyle}>My Account</p>
        <h1 style={sectionTitleStyle}>Profile</h1>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelStyle}>Email</span>
          <span style={valueStyle}>{user.email ?? "—"}</span>
        </div>
        {user.name && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={labelStyle}>Name</span>
            <span style={valueStyle}>{user.name}</span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={labelStyle}>User ID</span>
          <span style={valueStyle}>{userId}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={sectionTitleStyle}>API Keys</h2>
        <ApiKeyManager />
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" style={signOutButtonStyle}>
          Sign out
        </button>
      </form>
    </div>
  );
}
