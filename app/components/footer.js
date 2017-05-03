import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className='my-footer container'>
    <hr />
    <ul>
      <li><Link to='/help'>Help</Link></li>
      <li><Link to='/policy'>Privacy Policy</Link></li>
    </ul>
    <p>
      Running Miyako <a href='https://github.com/tkesgar/miyako/releases/tag/v__VERSION__' target='_blank'>__VERSION__</a> (<a href='https://github.com/tkesgar/miyako/commit/__COMMIT__' target='_blank'>__COMMIT__</a>). Written by <a href='https://tkesgar.com' target='_blank'>Ted Kesgar</a> and licensed under <a href='https://github.com/tkesgar/miyako/blob/master/LICENSE'>MIT License</a>.
    </p>
  </div>
)

export default Footer
