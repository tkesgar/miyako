import React from 'react'

const makeAlertContent = (data) => {
  // TODO return string based on data
  return JSON.stringify(data);
}

const Image = ({ name, src }) => (
  <div className="image">
    <div className="panel panel-default">
      <div className="panel-heading">{ name }</div>
      <div className="panel-body">
        <img className="panel-image" src={ src } />
      </div>
      <div className="panel-footer">
        <button type="button" className="btn btn-default">Save</button>
        <button type="button" className="btn btn-danger pull-right">Remove</button>
      </div>
    </div>
  </div>
)

const Alert = ({ style, children }) => (
  <div className={`alert alert-${ style || 'info' } alert-dismissible`}>
    <button type="button" className="close" data-dismiss="alert"><span>&times;</span></button>
    { children }
  </div>
)

const ImageList = ({ images, alerts }) => (
  <div className="container">
    <h2>Images</h2>
    {
      alerts.map((alert, id) => (
        <Alert key={ id } style={ alert.style }>
          { makeAlertContent(alert.data) }
        </Alert>
      ))
    }
    <div className="image-list">
      {
        images.map((image) => (
          <Image key={ image.url } name={ image.name } src={ image.src } />
        ))
      }
    </div>
    <h2>Download</h2>
    <p>Click this button to download all images as single compressed zip file.</p>
    <button type="button" className="btn btn-lg btn-primary">Download</button>
  </div>
)

export default ImageList
