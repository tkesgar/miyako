import { connect } from 'react-redux'
import { addImage, addAlert } from '../actions'
import FormInput from '../components/form-input'
import { rawProcessor } from '../lib/processors'

const findProcessor = (url) => {
  return 'RAW_IMAGE'
}

const processURL = (url) => {
  console.log(url)
  switch (findProcessor(url)) {
    case 'RAW_IMAGE':
      let result = rawProcessor(url)
      return addImage(url, result.name, result.src)
    default:
      return addAlert('warning', { message: 'UNSUPPORTED_URL', url })
  }
}

const mapStateToProps = (state, selfProps) => {
  return { }
}

const mapDispatchToProps = (dispatch, selfProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()

      let form = e.target
      let urls = form.elements['urls'].value.split('\n')
      urls.map(processURL).map(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormInput)
