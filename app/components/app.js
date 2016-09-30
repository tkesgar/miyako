import React from 'react'

import FormInputContainer from '../containers/form-input-container'
import ImageListContainer from '../containers/image-list-container'
import Navbar from './navbar'
import Footer from './footer'

const App = () => (
  <div>
    <Navbar />
    <FormInputContainer />
    <ImageListContainer />
    <Footer />
  </div>
)

export default App
