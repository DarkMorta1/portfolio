import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin_session")
    
    if (sessionToken) {
      return NextResponse.json({ authenticated: true })
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}



