const fetchItem = async (id) => {
    const type = document.querySelector('.main__filtros .btn--active').id

    try {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES`

        const response = await fetch(url)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(err)
    }
}

export default fetchItem
