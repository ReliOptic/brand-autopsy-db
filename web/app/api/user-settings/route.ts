// User settings endpoint.
// GET /api/user-settings  — fetch current user's settings
// PUT /api/user-settings  — update settings (body: { openrouter_api_key?: string })

import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";

const SETTINGS_PATH = join(process.cwd(), "..", "data", "user_settings.json");

export interface UserSettings {
  openrouter_api_key: string | null;
  updated_at: string;
}

interface SettingsStore {
  [userId: string]: UserSettings;
}

interface UpdatePayload {
  openrouter_api_key?: unknown;
}

interface SessionUser {
  id?: string;
  email?: string | null;
}

async function readStore(): Promise<SettingsStore> {
  try {
    const raw = await readFile(SETTINGS_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as SettingsStore;
    }
    return {};
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return {};
    throw err;
  }
}

async function writeStore(store: SettingsStore): Promise<void> {
  await mkdir(dirname(SETTINGS_PATH), { recursive: true });
  await writeFile(SETTINGS_PATH, JSON.stringify(store, null, 2), "utf8");
}

function getUserId(user: SessionUser): string | null {
  return user.id ?? user.email ?? null;
}

async function requireUserId(): Promise<string | NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { ok: false, error: "Authentication required." },
      { status: 401 },
    );
  }
  const userId = getUserId(session.user as SessionUser);
  if (!userId) {
    return NextResponse.json(
      { ok: false, error: "Session is missing a stable user id." },
      { status: 400 },
    );
  }
  return userId;
}

function maskKey(key: string): string {
  if (!key) return "";
  if (key.length <= 10) return key;
  return `${key.slice(0, 8)}${"*".repeat(20)}${key.slice(-4)}`;
}

export async function GET(): Promise<NextResponse> {
  const userIdOrResponse = await requireUserId();
  if (userIdOrResponse instanceof NextResponse) return userIdOrResponse;
  const userId = userIdOrResponse;

  try {
    const store = await readStore();
    const settings = store[userId] ?? { openrouter_api_key: null, updated_at: "" };
    return NextResponse.json({
      ok: true,
      settings: {
        ...settings,
        openrouter_api_key: settings.openrouter_api_key
          ? maskKey(settings.openrouter_api_key)
          : null,
        has_openrouter_key: !!settings.openrouter_api_key,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(JSON.stringify({ event: "user_settings.get.error", message, userId }));
    return NextResponse.json(
      { ok: false, error: "Failed to read settings." },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const userIdOrResponse = await requireUserId();
  if (userIdOrResponse instanceof NextResponse) return userIdOrResponse;
  const userId = userIdOrResponse;

  try {
    const body = (await req.json()) as UpdatePayload;
    const store = await readStore();
    const existing = store[userId] ?? { openrouter_api_key: null, updated_at: "" };

    const newKey =
      typeof body.openrouter_api_key === "string"
        ? body.openrouter_api_key.trim() || null
        : existing.openrouter_api_key;

    const updated: UserSettings = {
      ...existing,
      openrouter_api_key: newKey,
      updated_at: new Date().toISOString(),
    };

    store[userId] = updated;
    await writeStore(store);

    console.log(
      JSON.stringify({
        event: "user_settings.update",
        userId,
        has_openrouter_key: !!newKey,
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(JSON.stringify({ event: "user_settings.update.error", message, userId }));
    return NextResponse.json(
      { ok: false, error: "Failed to update settings." },
      { status: 500 },
    );
  }
}
