import fetchGenres from './fetchGenres'
import getGenre from './getGenre'

const fetchPopular = async (filter = 'movie', page = 1) => {
    const type = filter === 'movie' ? 'movie' : 'tv'
    const url = `https://api.themoviedb.org/3/${type}/popular?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES&page=${page}`
    const genres = await fetchGenres(type)

    try {
        const response = await fetch(url)
        const data = await response.json()
        const result = data.results

        result.forEach((elm) => {
            elm.genre = getGenre(elm.genre_ids[0], genres)
        })

        return result
    } catch (error) {
        console.log(error)
    }
}

export default fetchPopular
