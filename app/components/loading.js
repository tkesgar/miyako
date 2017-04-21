import React from 'react'
import { connect } from 'react-redux'

const Loading = ({ loading }) => (
  loading
    ? (
      <div className='my-loading'>
        <i className='fa fa-spinner fa-pulse fa-fw fa-2x' />
        <div>Loading...</div>
      </div>
    )
    : null
)

const mapStateToProps = (state) => ({
  loading: state.loading
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
