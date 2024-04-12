import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ query, sort }) {
  const [areMovies, setAreMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const previousQuery = useRef(query)

  const getMovies = useCallback(async ({ query }) => {
    if (query === previousQuery.current) return
    try {
      setLoading(true)
      setErrors(null)
      previousQuery.current = query
      const newMovies = await searchMovies({ query })
      setAreMovies(newMovies)
    } catch (e) {
      setErrors(e.message)
    } finally { setLoading(false) }
  }, [query])

  const sortedMovies = useMemo(() => {
    return sort ? [...areMovies].sort((a, b) => a.title.localeCompare(b.title)) : areMovies
  }, [sort, areMovies])

  return { areMovies: sortedMovies, getMovies, loading, errors }
}
