import React from 'react'

const Alert = ({ message, url, style, data }) => (
  <div className={`alert alert-${ style || 'info' }`}>
    <p><strong>{ url }: </strong> { message }</p>
  </div>
)

export default Alert
