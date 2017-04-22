import React from 'react'

import InputForm from './input-form'
import Loading from './loading'
import Message from './message'
import Result from './result'

const Download = ({ loading }) => (
  <div className='container'>
    <InputForm />
    <Message />
    <Loading />
    <Result />
  </div>
)

export default Download
