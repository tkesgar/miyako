import React from 'react'

import Alert from './alert'
import Image from './image'

const ImageList = ({ images, alerts, onRemoveImage }) => (
  <div className="container">
    <h2>Images</h2>
    {
      alerts.map((alert, id) => (
        <Alert key={ id } {...alert} />
      ))
    }
    <div className="image-list">
      { (!images || images.length === 0) ? (
        <div className="image-list-empty well">
          No images to be shown.
        </div>
        ) : (
        images.map((image) => (
        <Image
          key={ image.id }
          name={ image.name }
          src={ image.src }
          onRemove={ () => onRemoveImage(image.id) }
        />
        ))
        )
      }
    </div>
  </div>
)

export default ImageList
