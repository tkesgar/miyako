import React from 'react'

import Alert from './alert'
import Image from './image'

const ImageList = ({ images, alerts, onRemoveImage }) => (
  <div className="image-list">
    <h2>Images</h2>
    {
      alerts.map((alert, id) => (
        <Alert key={ id } {...alert} />
      ))
    }
    <div className="images">
      { (!images || images.length === 0) ? (
        <div className="images-empty well">
          No images to be shown.
        </div>
        ) : (
        images.map((image) => (
        <Image
          key={ image.id }
          src={ image.src }
          name={ image.name }
          onRemove={ () => onRemoveImage(image.id) }
        />
        ))
        )
      }
    </div>
  </div>
)

export default ImageList
