import { NextRequest, NextResponse } from "next/server"
// @ts-expect-error @vercel/kv provides types at runtime in the deployed env
import { kv } from "@vercel/kv"

export const runtime = "nodejs"

// Allow using Upstash vars directly if KV_* are not set
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const KV_KEY = "portfolio:data"

const DEFAULT_DATA = {
  hero: {},
  about: { achievements: [], timeline: [], certifications: [] },
  projects: [],
  skills: { categories: [] },
  contact: {},
}

function checkAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get("admin_session")
  return !!sessionToken
}

function missingEnv() {
  return !KV_URL || !KV_TOKEN
}

export async function GET() {
  try {
    if (missingEnv()) {
      console.error("KV env vars missing", { KV_URL: !!KV_URL, KV_TOKEN: !!KV_TOKEN })
      return NextResponse.json({ error: "KV is not configured (missing env vars)" }, { status: 500 })
    }

    const data = await kv.get<typeof DEFAULT_DATA>(KV_KEY)
    return NextResponse.json(data ?? DEFAULT_DATA)
  } catch (error) {
    console.error("Error reading portfolio data:", error)
    return NextResponse.json({ error: "Failed to read data", detail: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    if (missingEnv()) {
      console.error("KV env vars missing", { KV_URL: !!KV_URL, KV_TOKEN: !!KV_TOKEN })
      return NextResponse.json({ error: "KV is not configured (missing env vars)" }, { status: 500 })
    }

    const updatedData = await request.json()
    await kv.set(KV_KEY, updatedData)
    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    return NextResponse.json({ error: "Failed to update data", detail: String(error) }, { status: 500 })
  }
}

