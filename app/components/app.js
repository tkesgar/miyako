import React from 'react'

import FormInputContainer from '../containers/form-input-container'
import ImageListContainer from '../containers/image-list-container'
import Navbar from './navbar'
import Footer from './footer'

export const Home = () => (
  <div className="container">
    <FormInputContainer />
    <ImageListContainer />
  </div>
)

const App = ({ children }) => (
  <div>
    <Navbar />
    { children }
    <Footer />
  </div>
)

export default App
