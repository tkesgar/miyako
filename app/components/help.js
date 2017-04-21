import React from 'react'

import { AjaxHTMLPage } from 'lib/components/ajax'

const Help = () => (
  <div className='container-fluid container-thin'>
    <AjaxHTMLPage url='/help.html'
      view={({ data }) => (<div dangerouslySetInnerHTML={{__html: data}} />)}
    />
  </div>
)

export default Help
