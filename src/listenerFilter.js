import fetchPopular from './fetchPopular'
import uploadGenre from './uploadGenre'
import uploadTitle from './uploadTitle'

const filterMovie = document.getElementById('movie')
const filterTv = document.getElementById('tv')

filterMovie.addEventListener('click', async (e) => {
    e.preventDefault()

    // Cargamos los generos en la barra lateral
    uploadGenre('movie')

    // Obtenemos los resultados
    const results = await fetchPopular('movie')

    // Los cargamos en el DOM
    uploadTitle(results)

    filterTv.classList.remove('btn--active')
    filterMovie.classList.add('btn--active')
    document.querySelector('#populares .main__titulo').innerText =
        'Películas Populares'
})

filterTv.addEventListener('click', async (e) => {
    e.preventDefault()

    // Cargamos los generos en la barra lateral
    uploadGenre('tv')

    // Obtenemos los resultados
    const results = await fetchPopular('tv')

    // Los cargamos en el DOM
    uploadTitle(results)

    filterMovie.classList.remove('btn--active')
    filterTv.classList.add('btn--active')
    document.querySelector('#populares .main__titulo').innerText =
        'Series Populares'
})
