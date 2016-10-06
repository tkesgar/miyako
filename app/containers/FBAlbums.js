import { connect } from 'react-redux'
import { removeImage } from '../actions'
import FBAlbums from '../components/FBAlbums'
import md5 from 'js-md5'

const getFBAlbums = images => {
  return images
    .filter(x => x.data.type === 'facebook' && x.data.result.type === 'album')
    .map(x => Object.assign({ id: x.id }, x.data.result))
}

const mapStateToProps = state => ({
  albums: getFBAlbums(state.images)
})

const mapDispatchToProps = dispatch => ({
  onRemoveAlbum: id => dispatch(removeImage(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FBAlbums)
