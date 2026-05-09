import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDesignMd, fetchDesignMdJson } from "@/lib/api";
import { AgentPromptCard } from "@/components/agent-prompt-card";
import { DesignMdPreview } from "@/components/design-md-preview";
import { DesignMdViewer } from "@/components/design-md-viewer";
import { T } from "@/components/ui-primitives";

interface PageProps {
  params: Promise<{ ticker: string }>;
}

export default async function BrandDesignMdPage({ params }: PageProps): Promise<JSX.Element> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();
  let data;
  let designMd;
  try {
    [data, designMd] = await Promise.all([
      fetchDesignMd(tickerUp),
      fetchDesignMdJson(tickerUp),
    ]);
  } catch {
    notFound();
  }

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: T.sans, minHeight: "100vh", padding: "18px 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link href={`/brands/${tickerUp}?view=report`} style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 11, textDecoration: "none" }}>
          ← BACK TO {tickerUp}
        </Link>
        <Link href={`/brands/${tickerUp}`} style={{ color: T.accentBright, fontFamily: T.mono, fontSize: 11, textDecoration: "none" }}>
          OVERVIEW
        </Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DesignMdViewer data={data} />
        <DesignMdPreview designMd={designMd} />
        <AgentPromptCard designMd={designMd} markdownContent={data.markdown} />
      </div>
    </div>
  );
}
