import React from 'react'

import { AjaxHTMLPage } from 'lib/components/ajax'

const About = () => (
  <div className='container-fluid container-thin'>
    <AjaxHTMLPage url='/about.html'
      view={({ data }) => (<div dangerouslySetInnerHTML={{__html: data}} />)}
    />
  </div>
)

export default About
