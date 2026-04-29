import type { CSSProperties } from "react";
import { T } from "@/components/ui-primitives";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Settings",
};

const pageStyle: CSSProperties = {
  maxWidth: 680,
  margin: "0 auto",
  padding: "48px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 32,
};

const headerTagStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 11,
  color: T.textMuted,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  margin: 0,
};

const titleStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 22,
  fontWeight: 600,
  color: T.textBright,
  margin: 0,
};

const sectionTitleStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 11,
  color: T.textMuted,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  margin: "0 0 12px 0",
  paddingBottom: 8,
  borderBottom: `1px solid ${T.border}`,
};

export default function SettingsPage(): JSX.Element {
  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={headerTagStyle}>Configuration</p>
        <h1 style={titleStyle}>Settings</h1>
      </div>

      <section>
        <h2 style={sectionTitleStyle}>AI Integration</h2>
        <SettingsForm />
      </section>
    </div>
  );
}
