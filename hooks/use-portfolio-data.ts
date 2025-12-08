"use client"

import { useEffect, useState } from "react"

interface PortfolioData {
  hero?: any
  about?: any
  projects?: any[]
  skills?: any
  contact?: any
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load portfolio data")
        const json = await res.json()
        if (isMounted) {
          setData(json)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error")
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}

