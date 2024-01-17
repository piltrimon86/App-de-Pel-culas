const uploadTitle = (results) => {
    const container = document.querySelector('#populares .main__grid')

    results.forEach((res) => {
        const template = `
            <div class="main__media">
                <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${res.poster_path}" alt="" />            
                </a>
                <p class="main__media-titulo">${res.title}</p>
                <p class="main__media-fecha">${res.release_date}</p>
            </div>
        `
        container.insertAdjacentHTML('beforeend', template)
    })
}

export default uploadTitle
