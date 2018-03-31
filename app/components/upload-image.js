import React from 'react'
import { Link } from 'react-router-dom'

class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }
  handleUpload(e) {
    const [file] = e.target.files

    const reader = new FileReader()
    reader.onload = (e) => {
      this.setState({src: e.target.result})
    }
    reader.readAsDataURL(file)
  }

  render() {
    const src = this.state.src || null
    const imgElement = src ? <img className='img-thumbnail img-responsive' src={src}/> : null
    return (
      <div>
        <div className="form-group">
          <label><b>Upload image</b></label>
          <div className="help-block">Required as the image to share. See the <Link to='/help'>help</Link> for more information about this.</div>
          <input required type="file" id="exampleInputFile" accept="image/*" multiple={false} onChange={this.handleUpload.bind(this)} />
          {imgElement}
        </div>
      </div>
    )
  }
}

export default UploadImage
