import fetchGenres from './fetchGenres'
import getGenre from './getGenre'

const fetchSearch = async (page = 1) => {
    const type = document.querySelector('.main__filtros .btn--active').id
    const idGenre = document.querySelector('#filtro-generos .btn--active')
        ?.dataset.id
    const initialYear = document.getElementById('años-min').value || 1950
    const finalYear = document.getElementById('años-max').value || 2024

    let url
    if (type === 'movie') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=31e525640d7e0c401602ee3129373d56&include_adult=false&include_video=false&language=es-ES&page=${page}&release_date.gte=${initialYear}&release_date.lte=${finalYear}&sort_by=popularity.desc&with_genres=${idGenre}`
    } else if (type === 'tv') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=31e525640d7e0c401602ee3129373d56&first_air_date.gte=${initialYear}&first_air_date.lte=${finalYear}&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${idGenre}`
    }

    try {
        const response = await fetch(url)
        const data = await response.json()
        const result = data.results

        const genres = await fetchGenres()
        result.forEach((elm) => {
            elm.genre = getGenre(elm.genre_ids[0], genres)
        })

        return result
    } catch (error) {
        console.log(error)
    }
}

export default fetchSearch
