import React from 'react'

const FormInput = ({ onSubmit }) => (
  <div className="container">

    <h2>Input</h2>

    <form className="form-input" onSubmit={ onSubmit }>
      <div className="form-group">
        <label htmlFor="urls">URLs</label>
        <textarea id="urls" name="urls" className="form-control" placeholder="Insert URLs here" rows="10" required></textarea>
      </div>
      <button type="submit" className="btn btn-lg btn-primary">Add Images</button>
    </form>

  </div>
)

export default FormInput
