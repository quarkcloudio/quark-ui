import { useState, useCallback } from 'react'

export default function global() {
  const [pageLoading, setPageLoading] = useState(false)
  const [buttonLoadings, setButtonLoadings] = useState([])

  const changePageLoading = useCallback((status) => {
    setPageLoading(status)
  }, [])

  const changeButtonLoadings = useCallback((status) => {
    setButtonLoadings(status)
  }, [])

  return {
    pageLoading,
    changePageLoading,
    buttonLoadings,
    changeButtonLoadings,
  }
}