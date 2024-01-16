const fetchPopular = async () => {
    const url =
        'https://api.themoviedb.org/3/movie/popular?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES&page=1'

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.log(error)
    }
}

export default fetchPopular
