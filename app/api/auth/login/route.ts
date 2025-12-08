import { NextRequest, NextResponse } from "next/server"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "Ojash 112#"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use proper JWT or session management)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString("base64")
      
      const response = NextResponse.json({ success: true, message: "Login successful" })
      
      // Set cookie with session token
      response.cookies.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return response
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 })
  }
}



