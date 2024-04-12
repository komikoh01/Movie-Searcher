import { useEffect, useState, useRef } from 'react'

export function useSearch () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const firstInputValue = useRef(true)

  useEffect(() => {
    if (firstInputValue.current) {
      firstInputValue.current = query === ''
      return
    }
    if (query === '') {
      setError('No se pueden buscar peliculas vacias')
      return
    }
    if (query.length < 3) {
      setError('Los nombres de peliculas deben tener al menos 3 caracteres')
      return
    }
    if (query.startsWith('')) {
      setError(
        'No puedes iniciar el nombre de una pelicula con un espacio vacio'
      )
    }
    setError(null)
  }, [query])

  return { query, setQuery, error }
}
