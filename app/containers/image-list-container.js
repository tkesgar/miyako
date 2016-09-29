import { connect } from 'react-redux'
import ImageList from '../components/image-list'

const mapStateToProps = (state, selfProps) => {
  return {
    images: state.images,
    alerts: state.alerts
  }
}

const mapDispatchToProps = (dispatch, selfProps) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
