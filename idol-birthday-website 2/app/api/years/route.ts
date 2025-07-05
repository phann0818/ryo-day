import { NextResponse } from "next/server"
import { GoogleSheetsService } from "@/lib/google-sheets"

export async function GET() {
  const years = await GoogleSheetsService.getAllYears()
  return NextResponse.json({ years })
}
