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
            <div class="main__media" data-id="${elm.id}">
                <a href="#" class="main__media-thumb">
            <img class="main__media-img" src="https://image.tmdb.org/t/p/w500/${
                elm.poster_path
            }" alt="" />            
                </a>
                <p class="main__media-titulo">${elm.title || elm.name}</p>
                <p class="main__media-fecha">${elm.genre}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', template);
    });
};

const filterMovie = document.getElementById('movie');
const filterTv = document.getElementById('tv');

filterMovie.addEventListener('click', async (e) => {
    e.preventDefault();

    // Cargamos los generos en la barra lateral
    uploadGenre('movie');

    // Obtenemos los resultados
    const results = await fetchPopular('movie');

    // Los cargamos en el DOM
    uploadTitle(results);

    filterTv.classList.remove('btn--active');
    filterMovie.classList.add('btn--active');
    document.querySelector('#populares .main__titulo').innerText =
        'Películas Populares';
});

filterTv.addEventListener('click', async (e) => {
    e.preventDefault();

    // Cargamos los generos en la barra lateral
    uploadGenre('tv');

    // Obtenemos los resultados
    const results = await fetchPopular('tv');

    // Los cargamos en el DOM
    uploadTitle(results);

    filterMovie.classList.remove('btn--active');
    filterTv.classList.add('btn--active');
    document.querySelector('#populares .main__titulo').innerText =
        'Series Populares';
});

const container$1 = document.getElementById('filtro-generos');
container$1.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.closest('button')) {
        container$1.querySelector('.btn--active')?.classList.remove('btn--active');

        // Agregamos la clase active, para que el botón se marque al pulsar sobre él
        e.target.classList.add('btn--active');
    }
});

const fetchSearch = async (page = 1) => {
    const type = document.querySelector('.main__filtros .btn--active').id;
    const idGenre = document.querySelector('#filtro-generos .btn--active')
        ?.dataset.id;
    const initialYear = document.getElementById('años-min').value || 1950;
    const finalYear = document.getElementById('años-max').value || 2024;

    let url;
    if (type === 'movie') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=31e525640d7e0c401602ee3129373d56&include_adult=false&include_video=false&language=es-ES&page=${page}&release_date.gte=${initialYear}&release_date.lte=${finalYear}&sort_by=popularity.desc&with_genres=${idGenre}`;
    } else if (type === 'tv') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=31e525640d7e0c401602ee3129373d56&first_air_date.gte=${initialYear}&first_air_date.lte=${finalYear}&include_adult=false&include_null_first_air_dates=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${idGenre}`;
    }

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

const btn = document.getElementById('btn-buscar');
btn.addEventListener('click', async (e) => {
    const results = await fetchSearch();

    uploadTitle(results);
});

const previousPage = document.getElementById('pagina-anterior');
const nextPage = document.getElementById('pagina-siguiente');

nextPage.addEventListener('click', async (e) => {
    const currentPage = document.getElementById('populares').dataset.pagina;

    try {
        const results = await fetchSearch(currentPage + 1);
        document
            .getElementById('populares')
            .setAttribute('data-pagina', parseInt(currentPage) + 1);

        uploadTitle(results);
        window.scrollTo(0, 0);
    } catch (error) {
        console.log(error);
    }
});

previousPage.addEventListener('click', async (e) => {
    const currentPage = document.getElementById('populares').dataset.pagina;

    if (currentPage > 1) {
        try {
            const results = await fetchSearch(currentPage - 1);
            document
                .getElementById('populares')
                .setAttribute('data-pagina', parseInt(currentPage) - 1);

            uploadTitle(results);
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error);
        }
    }
});

const fetchItem = async (id) => {
    const type = document.querySelector('.main__filtros .btn--active').id;

    try {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=31e525640d7e0c401602ee3129373d56&language=es-ES`;

        const response = await fetch(url);
        const data = await response.json();

        return data
    } catch (err) {
        console.log(err);
    }
};

const container = document.getElementById('populares');
const popUp$1 = document.getElementById('media');

container.addEventListener('click', async (e) => {
    if (e.target.closest('.main__media')) {
        // Activamos la ventana emergente
        popUp$1.classList.add('media--active');

        const id = e.target.closest('.main__media').dataset.id;

        const result = await fetchItem(id);

        const template = `
            <div class="media__backdrop">
                <img
                    src="https://image.tmdb.org/t/p/w500/${
                        result.backdrop_path
                    }"
                    class="media__backdrop-image" 
                />
            </div>
            <div class="media__imagen">
                <img
                    src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                    class="media__poster" 
                />
            </div>
            <div class="media__info">
                <h1 class="media__titulo">${result.title || result.name}</h1>
                <p class="media__fecha">${
                    result.release_date || result.first_air_date
                }</p>
                <p class="media__overview">${result.overview}</p>
            </div>
            <button class="media__btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    class="media__btn-icono">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
                </button>
        `;

        document.querySelector('#media .media__contenedor').innerHTML = template;
    }
});

const popUp = document.getElementById('media');

popUp.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        popUp.classList.remove('media--active');
    }
});

const upload = async () => {
    const results = await fetchPopular();
    uploadTitle(results);
    uploadGenre('movie');
};
upload();
//# sourceMappingURL=bundle.js.map
