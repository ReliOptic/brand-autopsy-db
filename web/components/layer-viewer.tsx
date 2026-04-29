"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LayerViewerProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  return lines
    .filter(line => /^#{2,3}\s/.test(line))
    .map(line => {
      const level = line.match(/^(#{2,3})/)?.[1].length ?? 2;
      const text = line.replace(/^#{2,3}\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { id, text, level };
    });
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);

  if (!headings.length) return null;

  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-lg p-3 mb-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-[#64748B] hover:text-[#E2E8F0] text-xs font-medium transition-colors w-full text-left"
      >
        <span>&#8801; Table of Contents</span>
        <span className="ml-auto">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <nav className="mt-2 space-y-0.5">
          {headings.map(h => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block text-[#64748B] hover:text-[#6366F1] transition-colors ${
                h.level === 2 ? "text-xs py-0.5" : "text-xs py-0.5 pl-3 opacity-80"
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

export function LayerViewer({ content }: LayerViewerProps) {
  const headings = extractHeadings(content);

  return (
    <div>
      <TableOfContents headings={headings} />
      <div className="markdown prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return <h2 id={id}>{children}</h2>;
            },
            h3: ({ children }) => {
              const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return <h3 id={id}>{children}</h3>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
