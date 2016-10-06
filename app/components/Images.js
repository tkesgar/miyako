import React from 'react'

const Image = ({ id, src, name, onRemove }) => (
  <div id={id} className="image">
    <div className="panel panel-default">
      <div className="panel-heading">
        {name}
      </div>
      <div className="panel-body">
        <img className="panel-image" src={src} alt={name} />
      </div>
      <div className="panel-footer">
        {/* HTML5 download attribute works on Chrome but not Firefox due to security issues */}
        <a href={src} download={name} target="_blank" className="btn btn-default">Download</a>
        <button type="button" className="btn btn-danger pull-right" onClick={onRemove}>Remove</button>
      </div>
    </div>
  </div>
)

export default ({ images, onRemoveImage }) => {
  if (!images || images.length == 0) {
    return null
  } else {
    return (
      <div className="image-list">
        <h2>Images</h2>
        <div className="images">
          { images.map(image =>
            <Image
              key={image.id}
              onRemove={ () => onRemoveImage(image.id) }
              {...image}
            />
            )
          }
        </div>
      </div>
    )
  }
}
