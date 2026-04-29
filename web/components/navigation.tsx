"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { T } from "./ui-primitives";

interface NavigationProps {
  brandCount?: number;
}

interface NavLink {
  href: string;
  label: string;
  icon: (active: boolean) => JSX.Element;
}

const iconStroke = (active: boolean): string => (active ? T.accentBright : T.textMuted);

const GridIcon = (active: boolean): JSX.Element => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={iconStroke(active)}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const CompareIcon = (active: boolean): JSX.Element => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={iconStroke(active)}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 3h5v5M4 20l16.2-16.2M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);

const BarChartIcon = (active: boolean): JSX.Element => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={iconStroke(active)}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const SettingsIcon = (active: boolean): JSX.Element => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={iconStroke(active)}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SearchIcon = (): JSX.Element => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.textMuted}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LogoMark = (): JSX.Element => (
  <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden="true">
    <rect x="1" y="1" width="7" height="7" fill={T.accent} />
    <rect
      x="10"
      y="1"
      width="7"
      height="7"
      fill="none"
      stroke={T.accent}
      strokeWidth={1.2}
    />
    <rect
      x="1"
      y="10"
      width="7"
      height="7"
      fill="none"
      stroke={T.accent}
      strokeWidth={1.2}
    />
    <rect x="10" y="10" width="7" height="7" fill={T.accent} opacity={0.4} />
  </svg>
);

export function Navigation({ brandCount }: NavigationProps = {}): JSX.Element | null {
  const pathname = usePathname();

  // Landing page renders its own top bar; no app chrome.
  if (pathname === "/") return null;

  const links: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: GridIcon },
    { href: "/compare", label: "Compare", icon: CompareIcon },
    { href: "/analytics", label: "Analytics", icon: BarChartIcon },
  ];

  const isActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(`${href}/`);

  const settingsActive = isActive("/settings");

  const navStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: 48,
    borderBottom: `1px solid ${T.border}`,
    backgroundColor: T.bgDeep,
    backdropFilter: "blur(8px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  };

  const countLabel =
    typeof brandCount === "number" ? `${brandCount} BRANDS` : "S&P 500";

  return (
    <nav aria-label="Main navigation" className="no-print" style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <LogoMark />
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: T.textBright,
            }}
          >
            BAUTOPSY
          </span>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              color: T.textDim,
              letterSpacing: "0.05em",
            }}
          >
            v2.4 · {countLabel}
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map(({ href, label, icon }) => {
            const active = isActive(href);
            const linkStyle: CSSProperties = {
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 4,
              cursor: "pointer",
              background: active ? `${T.accent}18` : "transparent",
              color: active ? T.accentBright : T.textMuted,
              fontFamily: T.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderTop: active
                ? `1px solid ${T.accent}40`
                : "1px solid transparent",
              textDecoration: "none",
            };
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                style={linkStyle}
              >
                {icon(active)}
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 8px 5px 10px",
            borderRadius: 4,
            cursor: "pointer",
            background: T.surface,
            border: `1px solid ${T.border}`,
            color: T.textMuted,
            fontFamily: T.mono,
            fontSize: 11,
          }}
        >
          <SearchIcon />
          <span>Search brands…</span>
          <span
            style={{
              display: "inline-flex",
              gap: 2,
              padding: "1px 4px",
              border: `1px solid ${T.border}`,
              borderRadius: 2,
              color: T.textDim,
              fontSize: 9,
            }}
          >
            ⌘ K
          </span>
        </button>
        <Link
          href="/settings"
          title="Settings"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 4,
            background: settingsActive ? `${T.accent}18` : "transparent",
            border: settingsActive ? `1px solid ${T.accent}40` : "1px solid transparent",
            textDecoration: "none",
          }}
          aria-current={settingsActive ? "page" : undefined}
        >
          {SettingsIcon(settingsActive)}
        </Link>
        <div style={{ width: 1, height: 16, background: T.border }} />
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.success,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.success,
              boxShadow: `0 0 6px ${T.success}`,
            }}
          />
          LIVE
        </span>
      </div>
    </nav>
  );
}
