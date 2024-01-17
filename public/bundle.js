'use strict';

const fetchGenres = async (filter = 'movie') => {
    const type = filter === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES`;

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

const fetchPopular = async (filter = 'movie') => {
    const type = filter === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/${type}/popular?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES&page=1`;

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

const uploadGenre = async (filter) => {
    const genres = await fetchGenres(filter);

    containerGenre.innerHTML = '';

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

    container.innerHTML = '';

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

const filterMovie = document.getElementById('movie');
const filterTv = document.getElementById('tv');

filterMovie.addEventListener('click', (e) => {
    e.preventDefault();
});

filterTv.addEventListener('click', async (e) => {
    e.preventDefault();

    // Cargamos los generos en la barra lateral
    uploadGenre('tv');

    // Obtenemos los resultados
    const results = await fetchPopular('tv');

    // Los cargamos en el DOM
    uploadTitle(results);
});

const upload = async () => {
    const results = await fetchPopular();
    uploadTitle(results);
    uploadGenre('movie');
};
upload();
//# sourceMappingURL=bundle.js.map
