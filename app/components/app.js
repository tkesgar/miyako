import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from 'components/navbar'
import Footer from 'components/footer'
import Download from 'components/download'
import Help from 'components/help'
import About from 'components/about'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route path='/help' component={Help} />
      <Route path='/about' component={About} />
      <Route component={Download} />
    </Switch>
    <Footer />
  </div>
)

export default App
