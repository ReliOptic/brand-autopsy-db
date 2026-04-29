import { NextResponse, type NextRequest } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";

const WAITLIST_PATH = join(process.cwd(), "..", "data", "waitlist.json");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistEntry {
  email: string;
  persona: string;
  submitted_at: string;
}

interface WaitlistPayload {
  email: unknown;
  persona: unknown;
}

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(WAITLIST_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as WaitlistEntry[];
    }
    return [];
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

async function writeEntries(entries: WaitlistEntry[]): Promise<void> {
  await mkdir(dirname(WAITLIST_PATH), { recursive: true });
  await writeFile(WAITLIST_PATH, JSON.stringify(entries, null, 2), "utf8");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as WaitlistPayload;
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const persona = typeof body.persona === "string" ? body.persona.trim() : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }
    if (!persona) {
      return NextResponse.json(
        { ok: false, error: "Please select a persona." },
        { status: 400 },
      );
    }

    const entries = await readEntries();
    const alreadyJoined = entries.some((entry) => entry.email === email);
    if (!alreadyJoined) {
      entries.push({ email, persona, submitted_at: new Date().toISOString() });
      await writeEntries(entries);
    }

    console.log(
      JSON.stringify({
        event: "waitlist.signup",
        email,
        persona,
        already_joined: alreadyJoined,
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      JSON.stringify({ event: "waitlist.error", message }),
    );
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 },
    );
  }
}
