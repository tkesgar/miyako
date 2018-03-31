import React from 'react'
import { connect } from 'react-redux'
import { messageSet, resultSet, loadingStart, loadingFinish } from 'actions'
import extract from 'lib/extract'

import Auth from 'lib/components/auth'
import UploadImage from './upload-image'

const InputForm = ({ user, loading, submit }) => {
  return (
    <form className='my-input-form' onSubmit={handleShare}>
      <h1>Minakami <small>Share Pixiv URL to social media</small></h1>
      <div className='form-group'>
        <input
          type='url'
          id='input'
          className='form-control'
          placeholder='Paste Pixiv URL to share here'
          required
        />
      </div>
      <div className='form-group'>
        <label><b>Post text</b></label>
        <div className='help-block'>Note that Twitter does not support sharing long text (over 280 characters). <b>Any excess characters will be truncated.</b></div>
        <textarea
          className='form-control'
          placeholder='Insert post text'
          required
        />
      </div>
      <label><b>Dry run</b></label>
      <div className='help-block text-muted'>Check this box to simulate the posting to your social media account. No actual posts will be created, and the app will provide notifications instead. This is useful for testing purposes.</div>
      <div className="checkbox">
        <label>
          <input
            type='checkbox' defaultChecked
          />
          {" "}Perform a dry run
        </label>
      </div>
      <div className='row'>
        <div className='col-md-6 col-sm-8'>
          <div className='form-group'>
            <label>
              <b>Facebook account</b>
            </label>
            <div className="checkbox">
              <label>
                <input
                  type='checkbox'
                />
                {" "}Share to my Facebook timeline
              </label>
              <small className='help-block text-muted'>You can control the view access (Public, Friends Only, etc.) on the permission page.</small>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='facebookPage'>
              <b>
                Facebook Page name
              </b>
            </label>
            <input
              type='url'
              id='input'
              className='form-control'
              placeholder='Facebook page name (e.g. nonaninano)'
            />
            <small className='help-block text-muted'>Put only your page name here (e.g. <var>nonaninano</var>).</small>
          </div>
          <div className='form-group'>
            <label>
              <b>
                Twitter account
              </b>
            </label>
            <input
              type='url'
              id='input'
              className='form-control'
              placeholder='Twitter account handle (e.g. _ix_2_)'
            />
          </div>
        </div>
      </div>
      <button type='submit' className='btn btn-lg btn-primary btn-block'>
        Share
      </button>
    </form>
  )
}

function handleShare(e) {
  e.preventDefault()
  window.location.href = 'https://l.tkesgar.com/rickroll'
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
