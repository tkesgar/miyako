import { connect } from 'react-redux'
import { removeImage } from '../actions'
import Images from '../components/Images'

const getDirectImages = images => {
  return images
    .filter(x => ['direct', 'zerochan'].indexOf(x.data.type) != -1)
    .map(x => Object.assign({ id: x.id }, x.data.result ))
}

const mapStateToProps = state => ({
  images: getDirectImages(state.images)
})

const mapDispatchToProps = dispatch => ({
  onRemoveImage: (id) => dispatch(removeImage(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Images)
