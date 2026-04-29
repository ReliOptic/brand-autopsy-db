"use client";

// Client-side manager for API keys. Pairs with /api/keys route.

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { T } from "@/components/ui-primitives";

type Tier = "free" | "pro";

interface MaskedApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used: string | null;
  tier: Tier;
  requests_today: number;
  requests_limit: number;
}

interface FullApiKey extends MaskedApiKey {
  // The plaintext key value, only present immediately after creation.
}

interface ListResponse {
  ok: boolean;
  keys?: MaskedApiKey[];
  error?: string;
}

interface CreateResponse {
  ok: boolean;
  key?: FullApiKey;
  error?: string;
}

interface DeleteResponse {
  ok: boolean;
  error?: string;
}

const cardStyle: CSSProperties = {
  border: `1px solid ${T.border}`,
  borderRadius: 6,
  background: T.surface,
  padding: "20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const subtleText: CSSProperties = {
  fontFamily: T.mono,
  fontSize: 11,
  color: T.textMuted,
  letterSpacing: "0.04em",
};

const inputStyle: CSSProperties = {
  flex: 1,
  height: 36,
  padding: "0 10px",
  borderRadius: 4,
  border: `1px solid ${T.border}`,
  background: T.bgDeep,
  color: T.textBright,
  fontFamily: T.mono,
  fontSize: 12,
  outline: "none",
};

const buttonStyle: CSSProperties = {
  height: 36,
  padding: "0 14px",
  borderRadius: 4,
  border: `1px solid ${T.accent}`,
  background: T.accent,
  color: T.bg,
  fontFamily: T.mono,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const ghostButtonStyle: CSSProperties = {
  height: 28,
  padding: "0 10px",
  borderRadius: 4,
  border: `1px solid ${T.border}`,
  background: "transparent",
  color: T.textSecondary,
  fontFamily: T.mono,
  fontSize: 10,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const dangerButtonStyle: CSSProperties = {
  ...ghostButtonStyle,
  borderColor: `${T.error}55`,
  color: T.error,
};

const rowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(120px, 1.2fr) minmax(220px, 2fr) 110px 110px 90px",
  gap: 12,
  alignItems: "center",
  padding: "12px 0",
  borderBottom: `1px solid ${T.border}`,
};

const tierBadgeStyle = (tier: Tier): CSSProperties => {
  const color = tier === "pro" ? T.accentBright : T.textMuted;
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 7px",
    fontSize: 10,
    borderRadius: 3,
    border: `1px solid ${color}40`,
    backgroundColor: `${color}12`,
    color,
    fontFamily: T.mono,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

export function ApiKeyManager(): JSX.Element {
  const [keys, setKeys] = useState<MaskedApiKey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [revealedKey, setRevealedKey] = useState<FullApiKey | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const loadKeys = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/keys", { cache: "no-store" });
      const data = (await res.json()) as ListResponse;
      if (!res.ok || !data.ok) {
        setError(data.error ?? `Request failed (${res.status}).`);
        return;
      }
      setKeys(data.keys ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load keys.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadKeys();
  }, [loadKeys]);

  async function handleCreate(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = (await res.json()) as CreateResponse;
      if (!res.ok || !data.ok || !data.key) {
        setError(data.error ?? `Request failed (${res.status}).`);
        return;
      }
      setRevealedKey(data.key);
      setName("");
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create key.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRevoke(id: string): Promise<void> {
    setError(null);
    try {
      const res = await fetch(`/api/keys?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await res.json()) as DeleteResponse;
      if (!res.ok || !data.ok) {
        setError(data.error ?? `Request failed (${res.status}).`);
        return;
      }
      if (revealedKey?.id === id) setRevealedKey(null);
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke key.");
    }
  }

  async function handleCopy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1500);
    } catch (err) {
      console.error(
        JSON.stringify({
          event: "api_keys.copy.error",
          message: err instanceof Error ? err.message : "unknown",
        }),
      );
    }
  }

  return (
    <div style={cardStyle}>
      <form
        onSubmit={handleCreate}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Key name (e.g. production server)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          style={buttonStyle}
        >
          {submitting ? "Creating…" : "Create API Key"}
        </button>
      </form>

      {revealedKey && (
        <div
          style={{
            border: `1px solid ${T.accent}40`,
            background: `${T.accent}10`,
            borderRadius: 4,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              ...subtleText,
              color: T.accentBright,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            New key — copy now, it won&apos;t be shown again
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: T.mono,
              fontSize: 13,
              color: T.textBright,
              wordBreak: "break-all",
            }}
          >
            <code style={{ flex: 1 }}>{revealedKey.key}</code>
            <button
              type="button"
              onClick={() => handleCopy(revealedKey.key)}
              style={ghostButtonStyle}
            >
              {copyState === "copied" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            ...subtleText,
            color: T.error,
            border: `1px solid ${T.error}40`,
            borderRadius: 4,
            padding: "8px 12px",
            background: `${T.error}10`,
          }}
        >
          {error}
        </div>
      )}

      <div>
        <div
          style={{
            ...rowStyle,
            paddingTop: 0,
            color: T.textMuted,
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>Name</span>
          <span>Key</span>
          <span>Created</span>
          <span>Usage</span>
          <span>Tier</span>
        </div>

        {loading && <div style={subtleText}>Loading…</div>}

        {!loading && keys.length === 0 && (
          <div style={{ ...subtleText, padding: "16px 0" }}>
            No API keys yet. Create one above to start using the API.
          </div>
        )}

        {keys.map((entry) => (
          <div key={entry.id} style={rowStyle}>
            <span
              style={{
                fontFamily: T.sans,
                fontSize: 13,
                color: T.textBright,
              }}
            >
              {entry.name}
            </span>
            <code
              style={{
                fontFamily: T.mono,
                fontSize: 12,
                color: T.textSecondary,
                wordBreak: "break-all",
              }}
            >
              {entry.key}
            </code>
            <span style={subtleText}>{formatDate(entry.created_at)}</span>
            <span style={subtleText}>
              {entry.requests_today} / {entry.requests_limit}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              <span style={tierBadgeStyle(entry.tier)}>{entry.tier}</span>
              <button
                type="button"
                onClick={() => handleRevoke(entry.id)}
                style={dangerButtonStyle}
                aria-label={`Revoke ${entry.name}`}
              >
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
