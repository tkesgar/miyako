import { connect } from 'react-redux'
import { removeImage } from '../actions'
import FBImages from '../components/FBImages'

const getFBImages = images => {
  return images
    .filter(x => x.data.type === 'facebook' && x.data.result.type === 'image')
    .map(x => Object.assign({ id: x.id }, x.data.result ))
}

const mapStateToProps = state => ({
  images: getFBImages(state.images)
})

const mapDispatchToProps = dispatch => ({
  onRemoveImage: id => dispatch(removeImage(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FBImages)
