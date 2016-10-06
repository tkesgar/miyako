import React from 'react'
import FormAlert from './FormAlert'

const PLACEHOLDER = 'http://www.redjuicegraphics.com/BBS_hundred_suns_01_r15_Blog700.jpg'

const FormInput = ({ alert, processing, onSubmit }) => (
  <div className="form-url">

    <h1>Miyako <small>download photos and images</small></h1>

    <form onSubmit={ onSubmit }>
      <div className="form-group">
        <label htmlFor="url">Enter URL to download below:</label>
        <div className="input-group">
          <input type="url" name="url" className="form-control" placeholder={PLACEHOLDER} />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Download</button>
          </span>
        </div>
      </div>
    </form>
    { /* Display input alerts if present */ }
    { alert ? <FormAlert url={alert.url} message={alert.message} /> : null }

  </div>
)

export default FormInput
