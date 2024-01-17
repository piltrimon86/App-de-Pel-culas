'use strict';

const fetchGenres = async () => {
    const url =
        'https://api.themoviedb.org/3/genre/movie/list?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES';

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres
    } catch (error) {
        console.log(error);
    }
};

const getGenre = (id, genres) => {
    let name;

    genres.forEach((elm) => {
        if (id === elm.id) {
            name = elm.name;
        }
    });
    return name
};

const fetchPopular = async () => {
    const url =
        'https://api.themoviedb.org/3/movie/popular?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES&page=1';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.results;
        const genres = await fetchGenres();

        result.forEach((elm) => {
            elm.genre = getGenre(elm.genre_ids[0], genres);
        });

        return result
    } catch (error) {
        console.log(error);
    }
};

const containerGenre = document.getElementById('filtro-generos');

const uploadGenre = async () => {
    const genres = await fetchGenres();
    genres.forEach((genre) => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = genre.name;
        btn.setAttribute('data-id', genre.id);

        containerGenre.appendChild(btn);
    });
};

const uploadTitle = (results) => {
    const container = document.querySelector('#populares .main__grid');

    results.forEach((elm) => {
        const template = `
            <div class="main__media">
                <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${elm.poster_path}" alt="" />            
                </a>
                <p class="main__media-titulo">${elm.title}</p>
                <p class="main__media-fecha">${elm.genre}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', template);
    });
};

const upload = async () => {
    const results = await fetchPopular();
    uploadTitle(results);
    uploadGenre();
};
upload();
//# sourceMappingURL=bundle.js.map
