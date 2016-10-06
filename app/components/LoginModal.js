import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

const onHide = () => window.history.back()

export default ({ user, show, onLogin, errorLogin }) => {

  // If show (route is '/login') but user is logged in, navigates to '/'
  if (show && user) {
    history.pushState({}, '', '/');
  }

  return (
    <Modal show={user ? false : show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We need you to log in to download images from Facebook.</p>
        <button className="btn btn-primary" onClick={onLogin}>
          <i className="fa fa-fw fa-facebook-official"></i> Log in with Facebook
        </button>
        {errorLogin}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-default" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}
