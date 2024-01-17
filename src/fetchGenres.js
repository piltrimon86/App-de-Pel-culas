const fetchGenres = async (filter = 'movie') => {
    const type = filter === 'movie' ? 'movie' : 'tv'

    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.genres
    } catch (error) {
        console.log(error)
    }
}

export default fetchGenres
