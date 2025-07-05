"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GoogleSheetsService } from "@/lib/google-sheets"

export function AdminPanel() {
  const [testYear, setTestYear] = useState("2024")
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const result = await GoogleSheetsService.getMessages(testYear, 1, 5)
      setTestResult(result)
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  const testYears = async () => {
    setLoading(true)
    try {
      const years = await GoogleSheetsService.getAllYears()
      setTestResult({ years })
    } catch (error) {
      setTestResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Google Sheets Admin Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Year (e.g., 2024)" value={testYear} onChange={(e) => setTestYear(e.target.value)} />
          <Button onClick={testConnection} disabled={loading}>
            Test Messages
          </Button>
          <Button onClick={testYears} disabled={loading} variant="outline">
            Test Years
          </Button>
        </div>

        {testResult && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Test Result:</h4>
            <Textarea value={JSON.stringify(testResult, null, 2)} readOnly className="h-64 font-mono text-sm" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
