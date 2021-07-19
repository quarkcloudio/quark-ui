import { useState, useCallback } from 'react'

export default function global() {
  const [pageLoading, setPageLoading] = useState(false)

  const changePageLoading = useCallback((status) => {
    setPageLoading(status)
  }, [])

  return {
    pageLoading,
    changePageLoading,
  }
}