import fetchPopular from './fetchPopular'
import uploadGenre from './uploadGenre'
import uploadTitle from './uploadTitle'

const upload = async () => {
    const results = await fetchPopular()
    uploadTitle(results)
    uploadGenre()
}
upload()
