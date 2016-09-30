import { connect } from 'react-redux'
import { addImage, addAlert, clearAlert } from '../actions'
import FormInput from '../components/form-input'
import processURL from '../lib/process-url'

const promiseURL = (dispatch) => (url) => {

  // Simple logger that dispatch addAlert
  let logger = ({ message, style, data }) => {
    dispatch(addAlert(message, url, style || 'danger', data))
  }

  // Makes the promise to process URL
  return new Promise((resolve, reject) => {
    processURL(url, logger, resolve)
  })
  // Dispatch addImage on success
  .then((result) => {
    if (Array.isArray(result)) {
      result.forEach((r) => dispatch(addImage(r.id, r.src)))
    } else {
      dispatch(addImage(result.id, result.src))
    }
  })
  // Dispatch addAlert on failure or exception (using logger)
  .catch((error) => {
    logger(error)
  })
}

const handleSubmit = (dispatch) => (e) => {
  e.preventDefault()

  // Clear alerts first
  dispatch(clearAlert())

  // Get URLs from form
  let urls = e.target.elements['urls'].value
  // Preprocessing
  .split('\n')
  .map((url) => url.trim())
  // Eliminate falsy urls
  .filter((url) => url)

  // Start processing URLs
  urls.forEach(promiseURL(dispatch))
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: handleSubmit(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
