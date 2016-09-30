import { connect } from 'react-redux'
import { removeImage } from '../actions'
import ImageList from '../components/image-list'

const mapStateToProps = (state) => {
  return {
    images: state.images,
    alerts: state.alerts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveImage: (id) => dispatch(removeImage(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
