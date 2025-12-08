import { NextRequest, NextResponse } from "next/server"
import { kv } from "@vercel/kv"

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

export async function GET() {
  try {
    const data = await kv.get<typeof DEFAULT_DATA>(KV_KEY)
    return NextResponse.json(data ?? DEFAULT_DATA)
  } catch (error) {
    console.error("Error reading portfolio data:", error)
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedData = await request.json()
    await kv.set(KV_KEY, updatedData)
    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

