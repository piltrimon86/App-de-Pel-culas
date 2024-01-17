const getGenre = (id, genres) => {
    let name

    genres.forEach((elm) => {
        if (id === elm.id) {
            name = elm.name
        }
    })
    return name
}

export default getGenre
