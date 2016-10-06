import React from 'react'
import { Link } from 'react-router'

const alerts = {
  DONE: {
    state: 'success',
    content: url => <span>
      <strong>Done!</strong> You can view the result <a href={url}>below</a>.
    </span>
  },
  PROCESSING: {
    state: 'muted',
    content: url => <span>
      <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> <span>Processing your request, please wait...</span>
    </span>
  },

  REQUEST_FAILED: {
    state: 'danger',
    content: url => <span>
      <strong>Oops,</strong> we are unable to get the URL content. The network might be offline, or your browser is blocking the request for security reasons.
    </span>
  },
  REQUEST_FAILED_FIREFOX: {
    state: 'danger',
    content: url => <span>
      <strong>Oops,</strong> we are unable to get the URL content. The network might be offline, or Firefox is blocking the request for security reasons.
    </span>
  },
  FILE_NOT_IMAGE: {
    state: 'danger',
    content: url => <span>
      <strong>Um,</strong> it seems that this file is not an image, so we are unable to process this URL.
    </span>
  },
  FIREBASE_ERROR: {
    state: 'danger',
    content: url => <span>
      <strong>Oops,</strong> we are currently experiencing problems. Please try again later.
    </span>
  },
  MUST_LOGIN: {
    state: 'danger',
    content: url => <span>
      We need you to log in to download this URL. <Link to="/login"><strong>Click here to log in.</strong></Link>
    </span>
  },

  // Client/server-side errors
  URL_NOT_SUPPORTED: {
    state: 'danger',
    content: url => <span>
      <strong>Oops,</strong> it seems that this URL is currently not supported. Please check the link and try again.
    </span>
  },

  // Server-side errors
  API_REQUEST_FAILED: {
    state: 'danger',
    content: url => <span>
      <strong>Eep,</strong> our server is unable to download your request. Plese check the link and try again.
    </span>
  },
  SERVER_ERROR: {
    state: 'danger',
    content: url => <span>
      <strong>Uh-oh,</strong> it looks like our server is currently experiencing problems. Please try again later.
    </span>
  },

  // Unknown error
  UNKNOWN: {
    state: 'danger',
    content: url => <span>
      <strong>Uh-oh,</strong> something bad has just happened. If you know something, feel free to <a href="https://github.com/tkesgar/miyako/issues" target="_blank">report this to us</a>.
    </span>
  }
}

export default ({ url, message }) => {
  let { state, content } = alerts[message] || alerts['UNKNOWN']
  return <p className={`text-${state}`}>{ content(url) }</p>
}
