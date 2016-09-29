import React from 'react'

const FormInput = ({ onSubmit }) => (
  <div className="container">
    <h2>URLs</h2>
    <p>Insert URLs here, one URL at each line.</p>
    <form onSubmit={ onSubmit }>
      <div className="form-group">
        <label htmlFor="urls">URLs</label>
        <textarea id="urls" name="urls" className="form-control" placeholder="Insert URLs here" rows="10"></textarea>
      </div>
      <button type="submit" className="btn btn-lg btn-primary">Add Images</button>
    </form>
  </div>
)

export default FormInput
