import React from 'react'

const Image = ({ src, onRemove }) => (
  <div className="image">
    <div className="panel panel-default">
      <div className="panel-body">
        <img className="panel-image" src={ src } />
      </div>
      <div className="panel-footer">
        <a href={ src } target="_blank" download className="btn btn-default">Download</a>
        <button type="button" className="btn btn-danger pull-right" onClick={ onRemove }>Remove</button>
      </div>
    </div>
  </div>
)

export default Image
