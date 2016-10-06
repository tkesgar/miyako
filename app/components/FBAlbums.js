import React from 'react'
import Marked from './Marked'

const FBAlbumImage = ({ link, src, name }) => (
  <div className="fb-album-image">
    <div className="panel panel-default">
      <div className="panel-body">
        <img className="panel-image" src={src} alt={name} />
      </div>
      <div className="panel-footer">
        {/* HTML5 download attribute works on Chrome but not Firefox due to security issues */}
        <a href={src} download={name} target="_blank" className="btn btn-default btn-xs">Download</a>
        <button type="button" className="btn btn-danger pull-right btn-xs">Remove</button>
      </div>
    </div>
  </div>
)

const FBAlbum = ({ id, title, images }) => (
  <div id={id}>
    <h2>{title}</h2>
    <div className="fb-album">
      { images.map((image, i) => <FBAlbumImage key={i} {...image} />) }
    </div>
  </div>
)

export default ({ albums }) => {
  if (!albums || albums.length == 0) {
    return null
  } else {
    return (
      <div>
        { albums.map(album => <FBAlbum key={album.id} {...album} />) }
      </div>
    )
  }
}
