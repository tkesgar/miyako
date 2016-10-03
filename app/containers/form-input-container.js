import { connect } from 'react-redux'
import { addImage, addAlert, clearAlert } from '../actions'
import extract from '../lib/extract'
import FormInput from '../components/form-input'

const mapStateToProps = (state) => ({ })

const mapDispatchToProps = (dispatch) => ({
  onSubmit: e => {
    e.preventDefault()

    // Clear alerts
    dispatch(clearAlert())

    // Get URLs from form
    let urls = e.target.elements['urls'].value
      .split('\n')             // split lines
      .map(url => url.trim())  // trim whitespace
      .filter(url => url)      // eliminate falsy

    // Perform processing
    urls.forEach(url => {
      extract(url)
        .then(data => {
          // Successfully processed
          if (Array.isArray(data)) {
            data.forEach(({ src, name }, i) => {
              dispatch(addImage(`${url}#${i}`, src, name))
            })
          } else {
            dispatch(addImage(url, data.src, data.name))
          }
        })
        .catch(error => {
          // Failed or rejected
          dispatch(addAlert(url, error.message, 'danger'))
        })
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
