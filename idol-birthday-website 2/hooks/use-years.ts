"use client"

import { useState, useEffect } from "react"

export function useYears() {
  const [years, setYears] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch("/api/years")
        const data = (await res.json()) as { years: string[] }
        setYears(data.years.length ? data.years : ["2024", "2023"])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load years")
        setYears(["2024", "2023"])
      } finally {
        setLoading(false)
      }
    }

    fetchYears()
  }, [])

  return { years, loading, error }
}
