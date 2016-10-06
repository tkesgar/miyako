import { connect } from 'react-redux'
import { addImage, addAlert, clearAlert, setValue } from '../actions'
import extract from '../lib/extract'
import FormInput from '../components/FormInput'
import md5 from 'js-md5'

const mapStateToProps = state => ({
  alert: state.alert,
  processing: state.values.processing
})

const mapDispatchToProps = dispatch => ({
  onSubmit: e => {
    // Prevent default form events
    e.preventDefault()

    // Clear alert
    dispatch(clearAlert())

    // Starts processing
    dispatch(setValue('processing', true))

    // Get and preprocess input URL
    let url = e.target.elements['url'].value.trim()

    // Do nothing if falsy (empty)
    if (!url) return

    // Send processing alert
    dispatch(addAlert(url, 'PROCESSING'))

    // Process the URL
    extract(url)
      .then(result => {
        console.log('Successful', result)
        let hash = md5(url)
        dispatch(addImage(hash, result))
        dispatch(addAlert('#' + hash, 'DONE'))
      })
      .catch(error => {
        console.log('Failed', error)
        dispatch(addAlert(url, error.message))
        dispatch(setValue('processing', false))
      })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
