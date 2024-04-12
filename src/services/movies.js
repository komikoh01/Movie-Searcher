export const searchMovies = async ({ query }) => {
  if (query === '') return null

  try {
    const req = await fetch(` http://www.omdbapi.com/?apikey=4287ad07&s=${query} `)
    const res = await req.json()

    const movies = res.Search
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
      year: movie.Year
    }))
  } catch (e) {
    throw new Error('Error')
  }
}
