import { NextResponse } from "next/server"
import { GoogleSheetsService } from "@/lib/google-sheets"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const year = searchParams.get("year") ?? new Date().getFullYear().toString()
  const page = Number(searchParams.get("page") ?? "1")
  const limit = Number(searchParams.get("limit") ?? "12")

  try {
    const data = await GoogleSheetsService.getMessages(year, page, limit)

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { messages: [], hasMore: false, total: 0, error: "Failed to fetch messages" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  }
}
