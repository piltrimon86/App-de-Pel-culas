'use strict';

const fetchPopular = async () => {
    const url =
        'https://api.themoviedb.org/3/movie/popular?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES&page=1';

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results
    } catch (error) {
        console.log(error);
    }
};

const uploadTitle = (results) => {
    const container = document.querySelector('#populares .main__grid');

    results.forEach((res) => {
        const template = `
            <div class="main__media">
                <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${res.poster_path}" alt="" />            
                </a>
                <p class="main__media-titulo">${res.title}</p>
                <p class="main__media-fecha">${res.release_date}</p>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', template);
    });
};

const upload = async () => {
    const results = await fetchPopular();
    uploadTitle(results);
};
upload();
//# sourceMappingURL=bundle.js.map
