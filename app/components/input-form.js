import React from 'react'
import { connect } from 'react-redux'
import { messageSet, resultSet, loadingStart, loadingFinish } from 'actions'
import extract from 'lib/extract'

import Auth from 'lib/components/auth'

const InputForm = ({ user, loading, submit }) => {
  return (
    <form className='my-input-form' onSubmit={(e) => user && !loading ? submit(e) : e.preventDefault()}>
      <h1>Miyako <small>Facebook pictures downloader</small></h1>
      <fieldset disabled={loading}>
        <div className='input-group'>
          <input
            type='url'
            id='input'
            className='form-control'
            placeholder='Paste URL to download here'
            required
          />
          <span className='input-group-btn'>
            <Auth
              init={
                <button
                  className='btn btn-primary'
                  type='button'
                  disabled
                >
                  Log in with Facebook
                </button>
              }
              notLogin={
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={() => window.FB.login()}
                >
                  Log in with Facebook
                </button>
              }
              login={
                <button
                  className='btn btn-primary'
                  type='submit'
                >
                  Download
                </button>
              }
            />
          </span>
        </div>
      </fieldset>
    </form>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  submit: (e) => {
    // Prevent default submit events.
    e.preventDefault()

    // Get URL from input box.
    let url = e.target.elements['input'].value

    // Dispatch loading action.
    dispatch(loadingStart())

    // Extract data from url.
    extract(url)
      // Successful: set result.
      .then(result => {
        dispatch(resultSet(result))
      })
      // Failure: set message.
      .catch((err) => {
        dispatch(messageSet('danger', `
          <strong>Error:</strong> ${err.message}
        `))
      })
      // Dispatch loading finished.
      .then(() => dispatch(loadingFinish()))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)
