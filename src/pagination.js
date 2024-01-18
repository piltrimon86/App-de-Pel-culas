import fetchSearch from './fetchSearch'
import uploadTitle from './uploadTitle'

const previousPage = document.getElementById('pagina-anterior')
const nextPage = document.getElementById('pagina-siguiente')

nextPage.addEventListener('click', async (e) => {
    const currentPage = document.getElementById('populares').dataset.pagina

    try {
        const results = await fetchSearch(currentPage + 1)
        document
            .getElementById('populares')
            .setAttribute('data-pagina', parseInt(currentPage) + 1)

        uploadTitle(results)
        window.scrollTo(0, 0)
    } catch (error) {
        console.log(error)
    }
})

previousPage.addEventListener('click', async (e) => {
    const currentPage = document.getElementById('populares').dataset.pagina

    if (currentPage > 1) {
        try {
            const results = await fetchSearch(currentPage - 1)
            document
                .getElementById('populares')
                .setAttribute('data-pagina', parseInt(currentPage) - 1)

            uploadTitle(results)
            window.scrollTo(0, 0)
        } catch (error) {
            console.log(error)
        }
    }
})
