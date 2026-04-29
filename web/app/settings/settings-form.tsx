"use client";

import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import { T } from "@/components/ui-primitives";

interface SettingsData {
  has_openrouter_key: boolean;
  openrouter_api_key: string | null;
  updated_at: string;
}

const labelStyle: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 10,
  color: T.textMuted,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 6,
};

const descStyle: CSSProperties = {
  fontFamily: T.sans,
  fontSize: 12,
  color: T.textSecondary,
  lineHeight: 1.5,
  marginTop: 4,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 4,
  border: `1px solid ${T.border}`,
  background: T.bgDeep,
  color: T.textBright,
  fontFamily: T.mono,
  fontSize: 12,
  letterSpacing: "0.03em",
  outline: "none",
  boxSizing: "border-box",
};

const btnPrimaryStyle: CSSProperties = {
  padding: "8px 18px",
  borderRadius: 4,
  border: "none",
  background: T.accent,
  color: "#fff",
  fontFamily: T.mono,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const btnSecondaryStyle: CSSProperties = {
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

const tagStyle = (color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 3,
  border: `1px solid ${color}30`,
  background: `${color}12`,
  color,
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export function SettingsForm(): JSX.Element {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/user-settings");
      if (!res.ok) return;
      const data = (await res.json()) as { ok: boolean; settings: SettingsData };
      if (data.ok) setSettings(data.settings);
    } catch {
      // silently ignore on load
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSave = async (): Promise<void> => {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/user-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openrouter_api_key: keyInput || null }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        setStatus("saved");
        setKeyInput("");
        await load();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setErrorMsg(data.error ?? "Save failed.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error.");
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async (): Promise<void> => {
    setSaving(true);
    try {
      const res = await fetch("/api/user-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openrouter_api_key: "" }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (data.ok) {
        setStatus("saved");
        setKeyInput("");
        await load();
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setErrorMsg("Network error.");
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const cardStyle: CSSProperties = {
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    background: T.surface,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* OpenRouter API Key */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ ...labelStyle, marginBottom: 2 }}>OpenRouter API Key</p>
            <p style={descStyle}>
              Used for brand analysis via 200+ LLM models. Get a key at openrouter.ai/keys
            </p>
          </div>
          {settings && (
            <span style={tagStyle(settings.has_openrouter_key ? T.success : T.textMuted)}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: settings.has_openrouter_key ? T.success : T.textDim,
                }}
              />
              {settings.has_openrouter_key ? "CONFIGURED" : "NOT SET"}
            </span>
          )}
        </div>

        {settings?.has_openrouter_key && settings.openrouter_api_key && (
          <div style={rowStyle}>
            <p style={labelStyle}>Current key</p>
            <p
              style={{
                fontFamily: T.mono,
                fontSize: 12,
                color: T.textSecondary,
                letterSpacing: "0.05em",
              }}
            >
              {settings.openrouter_api_key}
            </p>
            {settings.updated_at && (
              <p style={{ ...descStyle, marginTop: 0 }}>
                Last updated: {new Date(settings.updated_at).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <div style={rowStyle}>
          <p style={labelStyle}>
            {settings?.has_openrouter_key ? "Replace key" : "Enter key"}
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type={showKey ? "text" : "password"}
                placeholder="sk-or-v1-..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                style={inputStyle}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              style={{ ...btnSecondaryStyle, padding: "8px 10px", flexShrink: 0 }}
              title={showKey ? "Hide" : "Show"}
            >
              {showKey ? (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!keyInput.trim() || saving}
            style={{
              ...btnPrimaryStyle,
              opacity: !keyInput.trim() || saving ? 0.5 : 1,
              cursor: !keyInput.trim() || saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Saving…" : "Save Key"}
          </button>
          {settings?.has_openrouter_key && (
            <button
              type="button"
              onClick={() => void handleClear()}
              disabled={saving}
              style={{ ...btnSecondaryStyle, color: T.error ?? "#f87171" }}
            >
              Clear
            </button>
          )}
          {status === "saved" && (
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.success }}>
              ✓ Saved
            </span>
          )}
          {status === "error" && (
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.error ?? "#f87171" }}>
              ✗ {errorMsg}
            </span>
          )}
        </div>
      </div>

      {/* Model preferences hint */}
      <div
        style={{
          ...cardStyle,
          borderColor: `${T.accent}30`,
          background: `${T.accent}08`,
          padding: "16px 20px",
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={T.accentBright} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p style={{ ...labelStyle, color: T.accentBright, marginBottom: 4 }}>How it works</p>
            <p style={descStyle}>
              When set, your OpenRouter key is used for on-demand brand analysis and layer regeneration.
              The analysis pipeline defaults to <code style={{ fontFamily: T.mono, fontSize: 11 }}>google/gemini-2.5-pro</code> but
              you can specify a model at analysis time. Keys are stored server-side and never exposed in the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
