function ListOfMovies ({ areMovies }) {
  return (
    <ul className='movieResults'>
      {
        areMovies?.map(movie => (
          <li className='movies' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.image} alt={movie.title} />
          </li>
        )
        )
        }
    </ul>
  )
}

function NoMovie () {
  return (
    <h3>Movie not found</h3>
  )
}

export function Movies ({ areMovies }) {
  const hasMovies = areMovies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies areMovies={areMovies} />
      : <NoMovie />
  )
}
