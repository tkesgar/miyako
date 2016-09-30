import { connect } from 'react-redux'
import { addImage, addAlert, clearAlert } from '../actions'
import FormInput from '../components/form-input'
import processURL from '../lib/process-url'

const promiseURL = (dispatch) => (url) => {

  // Simple logger that dispatch addAlert
  let logger = (message, style, data) => {
    dispatch(addAlert(message, url, style, data))
  }

  // Makes the promise to process URL
  return new Promise((resolve, reject) => {
    processURL(url, logger, resolve)
  })
  // Dispatch addImage on success
  .then((src) => {
    dispatch(addImage(url, src))
  })
  // Dispatch addAlert on failure or exception (using logger)
  .catch(({ message, style, data }) => {
    logger(message, style || 'danger', data)
  })
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()

      // Clear alerts first
      dispatch(clearAlert())

      let urls = e.target.elements['urls'].value

      // Start processing URLs
      urls
      // Preprocessing
      .split('\n')
      .map((url) => url.trim())
      // Eliminate falsy urls
      .filter((url) => url)
      // Perform processing
      .forEach(promiseURL(dispatch))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
