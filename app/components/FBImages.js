import React from 'react'
import Marked from './Marked'

const Image = ({ id, link, src, name, description, onRemove }) => (
  <div id={id} className="fb-image">
    <div className="panel panel-default">
      <div className="panel-body">
        <img className="panel-image" src={src} alt={name} />
        <Marked className="panel-content" content={description} />
      </div>
      <div className="panel-footer">
        {/* HTML5 download attribute works on Chrome but not Firefox due to security issues */}
        <a href={src} download={name} target="_blank" className="btn btn-default">Download</a>
        <a href={link} target="_blank" className="btn btn-link">View post</a>
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
        <h2>Facebook Images</h2>
        <div className="fb-images">
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
