import './App.css'
import { Movies } from './components/ListOfMovies'
import { useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { query, setQuery, error } = useSearch()
  const { areMovies, getMovies, loading, errors } = useMovies({ query, sort })
  // Forma no controlada
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const { query } = Object.fromEntries(
  //     new window.FormData(event.target)
  //   )
  //   console.log(query)
  // }

  const debouncedGetMovies = debounce(query => {
    getMovies({ query })
  }, 500)
  // Forma controlada
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query })
  }
  const handleState = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    debouncedGetMovies(newQuery)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={query} onChange={handleState} type='text' placeholder='...Typing...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}> {error} </p>}
      </header>

      <main className='results'>
        {loading ? <h3> Loading </h3> : <Movies areMovies={areMovies} />}
      </main>
    </div>
  )
}

export default App
