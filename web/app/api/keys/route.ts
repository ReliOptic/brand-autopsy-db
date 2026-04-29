// API key management endpoint.
// Requires authenticated session (next-auth v5). Stores keys in data/api_keys.json.
//
// GET    /api/keys           — list current user's API keys
// POST   /api/keys           — create a new API key (body: { name })
// DELETE /api/keys?id=<uuid> — revoke a key by id

import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { randomBytes, randomUUID } from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";

const KEYS_PATH = join(process.cwd(), "..", "data", "api_keys.json");

const FREE_LIMIT = 100;
const PRO_LIMIT = 10000;

export type ApiKeyTier = "free" | "pro";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used: string | null;
  tier: ApiKeyTier;
  requests_today: number;
  requests_limit: number;
}

interface KeyStore {
  [userId: string]: ApiKey[];
}

interface CreatePayload {
  name: unknown;
}

interface SessionUser {
  id?: string;
  email?: string | null;
}

async function readStore(): Promise<KeyStore> {
  try {
    const raw = await readFile(KEYS_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as KeyStore;
    }
    return {};
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return {};
    throw err;
  }
}

async function writeStore(store: KeyStore): Promise<void> {
  await mkdir(dirname(KEYS_PATH), { recursive: true });
  await writeFile(KEYS_PATH, JSON.stringify(store, null, 2), "utf8");
}

function generateKey(): string {
  return `bak_${randomBytes(16).toString("hex")}`;
}

function maskKey(key: string): string {
  if (key.length <= 12) return key;
  return `${key.slice(0, 8)}${"*".repeat(16)}${key.slice(-4)}`;
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

export async function GET(): Promise<NextResponse> {
  const userIdOrResponse = await requireUserId();
  if (userIdOrResponse instanceof NextResponse) return userIdOrResponse;
  const userId = userIdOrResponse;

  try {
    const store = await readStore();
    const keys = store[userId] ?? [];
    const masked = keys.map((entry) => ({
      ...entry,
      key: maskKey(entry.key),
    }));
    return NextResponse.json({ ok: true, keys: masked });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      JSON.stringify({ event: "api_keys.list.error", message, userId }),
    );
    return NextResponse.json(
      { ok: false, error: "Failed to read API keys." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const userIdOrResponse = await requireUserId();
  if (userIdOrResponse instanceof NextResponse) return userIdOrResponse;
  const userId = userIdOrResponse;

  try {
    const body = (await req.json()) as CreatePayload;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }

    const store = await readStore();
    const userKeys = store[userId] ?? [];
    const newKey: ApiKey = {
      id: randomUUID(),
      name,
      key: generateKey(),
      created_at: new Date().toISOString(),
      last_used: null,
      tier: "free",
      requests_today: 0,
      requests_limit: FREE_LIMIT,
    };
    store[userId] = [...userKeys, newKey];
    await writeStore(store);

    console.log(
      JSON.stringify({
        event: "api_keys.create",
        userId,
        keyId: newKey.id,
        tier: newKey.tier,
      }),
    );

    // Return the full plaintext key once on creation so the user can copy it.
    return NextResponse.json({ ok: true, key: newKey });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      JSON.stringify({ event: "api_keys.create.error", message, userId }),
    );
    return NextResponse.json(
      { ok: false, error: "Failed to create API key." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const userIdOrResponse = await requireUserId();
  if (userIdOrResponse instanceof NextResponse) return userIdOrResponse;
  const userId = userIdOrResponse;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing ?id=<uuid>." },
      { status: 400 },
    );
  }

  try {
    const store = await readStore();
    const userKeys = store[userId] ?? [];
    const next = userKeys.filter((entry) => entry.id !== id);
    if (next.length === userKeys.length) {
      return NextResponse.json(
        { ok: false, error: "Key not found." },
        { status: 404 },
      );
    }
    store[userId] = next;
    await writeStore(store);

    console.log(
      JSON.stringify({ event: "api_keys.revoke", userId, keyId: id }),
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      JSON.stringify({ event: "api_keys.revoke.error", message, userId }),
    );
    return NextResponse.json(
      { ok: false, error: "Failed to revoke API key." },
      { status: 500 },
    );
  }
}

// Tier limits (not exported — Next.js route files cannot have non-HTTP value exports).
const TIER_LIMITS: Readonly<Record<ApiKeyTier, number>> = {
  free: FREE_LIMIT,
  pro: PRO_LIMIT,
};
