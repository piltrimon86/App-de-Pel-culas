const uploadTitle = (results) => {
    const container = document.querySelector('#populares .main__grid')

    container.innerHTML = ''

    results.forEach((elm) => {
        const template = `
            <div class="main__media" data-id="${elm.id}">
                <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${
                elm.poster_path
            }" alt="" />            
                </a>
                <p class="main__media-titulo">${elm.title || elm.name}</p>
                <p class="main__media-fecha">${elm.genre}</p>
            </div>
        `
        container.insertAdjacentHTML('beforeend', template)
    })
}

export default uploadTitle
