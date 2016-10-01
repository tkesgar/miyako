import React from 'react'

const Image = ({ src, onRemove }) => (
  <div className="image">
    <div className="panel panel-default">
      <div className="panel-body">
        <img className="panel-image" src={ src } />
      </div>
      <div className="panel-footer">
        {/* HTML5 download attribute works on Chrome but not Firefox due to security issues */}
        <a href={ src } download target="_blank" className="btn btn-default">Download</a>
        <button type="button" className="btn btn-danger pull-right" onClick={ onRemove }>Remove</button>
      </div>
    </div>
  </div>
)

export default Image
