import React from 'react'

const Footer = () => (
  <div className='container'>
    <hr />
    <p>
      Running Miyako <a href='https://github.com/tkesgar/miyako/releases/tag/v__VERSION__' target='_blank'>__VERSION__</a> (<a href='https://github.com/tkesgar/miyako/commit/__COMMIT__' target='_blank'>__COMMIT__</a>). Written by <a href='https://tkesgar.com' target='_blank'>Ted Kesgar</a> and licensed under <a href='https://github.com/tkesgar/miyako/blob/master/LICENSE'>MIT License</a>.
    </p>
    <p><strong>Privacy Policy:</strong> We do not read or store anything.</p>
  </div>
)

export default Footer
