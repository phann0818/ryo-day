import "server-only"

interface SheetMessage {
  username: string
  message: string
  emoji?: string
  year: string
  timestamp?: string
}

interface GoogleSheetsResponse {
  values?: string[][]
}

export class GoogleSheetsService {
  // NOTE: no NEXT_PUBLIC_ prefix – server only
  private static readonly SHEET_ID = process.env.GOOGLE_SHEET_ID
  private static readonly API_KEY = process.env.GOOGLE_API_KEY

  /* ---------- helpers ---------- */
  private static apiUrl(range: string) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}?key=${this.API_KEY}`
  }

  /* ---------- public ---------- */
  static async getMessages(year: string, page = 1, limit = 12) {
    if (!this.SHEET_ID || !this.API_KEY) return { messages: [], hasMore: false, total: 0 }

    try {
      // First, get all data to filter by year and calculate total
      const allDataResp = await fetch(this.apiUrl("Messages!A:E"), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      })
      const allData: GoogleSheetsResponse = await allDataResp.json()

      if (!allData.values || allData.values.length <= 1) {
        return { messages: [], hasMore: false, total: 0 }
      }

      // Filter messages by year (skip header row)
      const filteredRows = allData.values.slice(1).filter((row) => row[3] === year)

      // Calculate pagination
      const total = filteredRows.length
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedRows = filteredRows.slice(startIndex, endIndex)

      // Convert to message objects
      const messages = paginatedRows.map<SheetMessage>((row) => ({
        username: row[0] || "Anonymous",
        message: row[1] || "",
        emoji: row[2] || "💌",
        year: row[3] || year,
        timestamp: row[4] || new Date().toISOString(),
      }))

      const hasMore = endIndex < total

      return { messages, hasMore, total }
    } catch (error) {
      console.error("Error in getMessages:", error)
      return { messages: [], hasMore: false, total: 0 }
    }
  }

  static async getAllYears(): Promise<string[]> {
    if (!this.SHEET_ID || !this.API_KEY) return []

    try {
      const resp = await fetch(this.apiUrl("Messages!D:D"), {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      })
      const data: GoogleSheetsResponse = await resp.json()

      const years = new Set<string>()
      data.values?.slice(1).forEach((row) => {
        if (row[0] && /^\d{4}$/.test(row[0])) years.add(row[0])
      })
      return Array.from(years).sort((a, b) => Number(b) - Number(a))
    } catch (error) {
      console.error("Error in getAllYears:", error)
      return []
    }
  }
}
