import { connect } from 'react-redux'
import { removeImage } from '../actions'
import ImageList from '../components/image-list'

const mapStateToProps = (state) => ({
  images: state.images,
  alerts: state.alerts
})

const mapDispatchToProps = (dispatch) => ({
  onRemoveImage: (id) => dispatch(removeImage(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
