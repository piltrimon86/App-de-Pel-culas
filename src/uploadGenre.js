import fetchGenres from './fetchGenres'

const containerGenre = document.getElementById('filtro-generos')

const uploadGenre = async (filter) => {
    const genres = await fetchGenres(filter)

    containerGenre.innerHTML = ''

    genres.forEach((genre) => {
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerText = genre.name
        btn.setAttribute('data-id', genre.id)

        containerGenre.appendChild(btn)
    })
}

export default uploadGenre
