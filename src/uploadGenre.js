import fetchGenres from './fetchGenres'

const containerGenre = document.getElementById('filtro-generos')

const uploadGenre = async () => {
    const genres = await fetchGenres()
    genres.forEach((genre) => {
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.innerText = genre.name
        btn.setAttribute('data-id', genre.id)

        containerGenre.appendChild(btn)
    })
}

export default uploadGenre
