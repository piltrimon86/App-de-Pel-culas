import fetchPopular from './fetchPopular'
import uploadGenre from './uploadGenre'
import uploadTitle from './uploadTitle'

const filterMovie = document.getElementById('movie')
const filterTv = document.getElementById('tv')

filterMovie.addEventListener('click', (e) => {
    e.preventDefault()
})

filterTv.addEventListener('click', async (e) => {
    e.preventDefault()

    // Cargamos los generos en la barra lateral
    uploadGenre('tv')

    // Obtenemos los resultados
    const results = await fetchPopular('tv')

    // Los cargamos en el DOM
    uploadTitle(results)
})
