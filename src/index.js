import fetchPopular from './fetchPopular'
import uploadTitle from './uploadTitle'

const upload = async () => {
    const results = await fetchPopular()
    uploadTitle(results)
}
upload()
