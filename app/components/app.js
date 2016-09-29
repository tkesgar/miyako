import React from 'react'

import FormInputContainer from '../containers/form-input-container'
import ImageListContainer from '../containers/image-list-container'
import Navbar from './navbar'

const images = [
  {name: 'Alpha', url: 1, src: `holder.js/750x${ 250 + Math.floor(Math.random() * 750) }?auto=yes`},
  {name: 'Beta', url: 2, src: `holder.js/750x${ 250 + Math.floor(Math.random() * 750) }?auto=yes`},
  {name: 'Charlie', url: 3, src: `holder.js/750x${ 250 + Math.floor(Math.random() * 750) }?auto=yes`},
  {name: 'Delta', url: 4, src: `holder.js/750x${ 250 + Math.floor(Math.random() * 750) }?auto=yes`},
]

const alerts = [
  {style: 'info', data: 'Yahallo!' },
  {style: 'warning', data: 'Yahallo!' },
  {style: 'danger', data: 'Yahallo!' },
]

const App = () => (
  <div>
    <Navbar />
    <FormInputContainer />
    <ImageListContainer />
  </div>
)

export default App
