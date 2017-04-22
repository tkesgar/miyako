import React from 'react'
import { connect } from 'react-redux'
import { messageClear } from 'actions'

const Message = ({ message, clear }) => (
  message
    ? (
      <div className={`my-message alert alert-dismissible alert-${message.status}`} role='alert'>
        <button type='button' className='close' aria-label='close' onClick={clear}>
          <span aria-hidden='true'>&times;</span>
        </button>
        <div dangerouslySetInnerHTML={{__html: message.content}} />
      </div>
    )
    : null
)

const mapStateToProps = (state) => ({
  message: state.message
})

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(messageClear())
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
