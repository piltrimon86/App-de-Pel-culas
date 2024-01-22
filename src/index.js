import fetchPopular from './fetchPopular'
import uploadGenre from './uploadGenre'
import uploadTitle from './uploadTitle'
import './listenerFilter'
import './listenerFilterGenre'
import './listenerSearch'
import './pagination'
import './listenerItems'
import './listenerPopup'

const upload = async () => {
    const results = await fetchPopular()
    uploadTitle(results)
    uploadGenre('movie')
}
upload()
