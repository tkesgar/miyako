import React from 'react'

import * as utils from 'lib/utils'

const ResultPhoto = ({ result }) => {
  return (
    <div className='my-result-photo row'>
      <div className='my-details col-sm-8'>
        <ul>
          <li>
            <span className='text-muted'>ID:</span>{' '}
            <a href={`//fb.com/${result.id}`} target='_blank'>{result.id}</a>
          </li>
          <li>
            <span className='text-muted'>From:</span>{' '}
            <a href={`//fb.com/${result.from.id}`} target='_blank'>{result.from.name}</a>
          </li>
          <li>
            <span className='text-muted'>Description:</span>{' '}
            <pre>{result.description}</pre>
          </li>
          <li>
            <a className='btn btn-primary'
              href={result.url}
              download
            >Download Image</a>
            {' '}
            <a className='btn btn-default'
              href={utils.createObjectURL(result)}
              download={utils.getFilename(result.url) + '.json'}
            >Download Data</a>
          </li>
        </ul>
      </div>
      <div className='col-sm-4'>
        <img src={result.url} />
      </div>
    </div>
  )
}

export default ResultPhoto
