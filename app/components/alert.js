import React from 'react'

const Alert = ({ message, url, state, data }) => (
  <div className={`alert alert-${ state || 'info' }`}>
    <p><strong>{ url }: </strong> { message }</p>
  </div>
)

export default Alert
