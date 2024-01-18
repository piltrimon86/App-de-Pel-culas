import fetchSearch from './fetchSearch'
import uploadTitle from './uploadTitle'

const btn = document.getElementById('btn-buscar')
btn.addEventListener('click', async (e) => {
    const results = await fetchSearch()

    uploadTitle(results)
})
