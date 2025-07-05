"use client"

import { useState, useEffect, useCallback } from "react"

interface Message {
  username: string
  message: string
  emoji?: string
  year: string
  timestamp?: string
}

export function useMessages(year: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(15) // Set to 15 for testing

  const loadMessages = useCallback(
    async (pageNum = 1, append = false) => {
      if (loading && pageNum > 1) return // Prevent multiple simultaneous requests

      setLoading(true)
      setError(null)

      try {
        // Simulate API delay for testing
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Add cache busting parameter
        const timestamp = new Date().getTime()
        const res = await fetch(`/api/messages?year=${year}&page=${pageNum}&limit=8&_t=${timestamp}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch messages: ${res.status}`)
        }

        const result = (await res.json()) as {
          messages: Message[]
          hasMore: boolean
          total: number
          error?: string
        }

        if (result.error) {
          throw new Error(result.error)
        }

        if (append) {
          setMessages((prev) => [...prev, ...result.messages])
        } else {
          setMessages(result.messages)
        }

        // Simulate pagination for testing with 15 total messages
        const totalLoaded = append ? messages.length + result.messages.length : result.messages.length
        setHasMore(totalLoaded < 15)
        setTotal(15)
      } catch (err) {
        console.error("Error loading messages:", err)
        setError(err instanceof Error ? err.message : "Failed to load messages")
        // Don't set empty messages on error, let component handle fallback
      } finally {
        setLoading(false)
      }
    },
    [year, messages.length],
  )

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      loadMessages(nextPage, true)
    }
  }, [loading, hasMore, page, loadMessages])

  const refresh = useCallback(() => {
    setPage(1)
    setMessages([])
    setHasMore(true)
    setError(null)
    setLoading(true)
    loadMessages(1, false)
  }, [loadMessages])

  useEffect(() => {
    // Reset state when year changes
    setPage(1)
    setMessages([])
    setHasMore(true)
    setError(null)
    setLoading(true)
    loadMessages(1, false)
  }, [year, loadMessages])

  return {
    messages,
    loading,
    error,
    hasMore,
    total,
    loadMore,
    refresh,
  }
}
