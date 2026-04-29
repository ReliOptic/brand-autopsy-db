"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import { T } from "./ui-primitives";

interface BrandSearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  resultLabel?: string;
}

const SearchIcon = (): JSX.Element => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke={T.textMuted}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export function BrandSearch({
  value,
  onChange,
  placeholder,
  resultLabel,
}: BrandSearchProps): JSX.Element {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setLocalValue(v);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onChange(v), 300);
    },
    [onChange],
  );

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    height: 34,
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    padding: "0 10px",
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    marginLeft: 8,
    background: "transparent",
    border: 0,
    outline: "none",
    color: T.text,
    fontSize: 12,
    fontFamily: T.mono,
    minWidth: 0,
  };

  return (
    <div style={containerStyle}>
      <SearchIcon />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder ?? "Search ticker, name, sector, archetype…"}
        aria-label="Search brands by ticker or name"
        style={inputStyle}
      />
      {resultLabel && (
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textDim,
            whiteSpace: "nowrap",
          }}
        >
          {resultLabel}
        </span>
      )}
    </div>
  );
}
