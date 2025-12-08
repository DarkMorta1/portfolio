import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

const DATA_DIR = join(process.cwd(), "data")
const DATA_FILE = join(DATA_DIR, "portfolio-data.json")

function checkAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get("admin_session")
  return !!sessionToken
}

export async function GET() {
  try {
    if (!existsSync(DATA_FILE)) {
      // Return default empty structure if file doesn't exist
      return NextResponse.json({
        hero: {},
        about: { achievements: [], timeline: [], certifications: [] },
        projects: [],
        skills: { categories: [] },
        contact: {},
      })
    }
    const data = await readFile(DATA_FILE, "utf-8")
    return NextResponse.json(JSON.parse(data))
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
    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }

    const updatedData = await request.json()
    await writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), "utf-8")
    return NextResponse.json({ success: true, message: "Data updated successfully" })
  } catch (error) {
    console.error("Error updating portfolio data:", error)
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
  }
}

