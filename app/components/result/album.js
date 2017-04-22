import React from 'react'
import { connect } from 'react-redux'

import * as utils from 'lib/utils'
import createZip from 'lib/create-zip'
import { zipStart, zipProgress, zipError, zipFinish } from 'actions'

const DownloadAlbum = connect(
  (state) => ({
    result: state.result,
    zip: state.zip
  }),
  (dispatch) => ({
    startZip: (album) => {
      // Get list of urls to download.
      let urls = album.images.map(image => image.url)

      // Dispatch start action.
      dispatch(zipStart())

      // Make the promise.
      createZip(urls, (progress, info) => dispatch(zipProgress(progress, info)))
        .then((zipBlob) => {
          // Successful: dispatch finish action.
          let url = window.URL.createObjectURL(zipBlob)
          dispatch(zipFinish(url))
        })
        .catch((error) => {
          // Failure: dispatch error action.
          dispatch(zipError(error))
        })
    }
  })
)(({ result, zip, startZip }) => (
  zip
  // Zip has started.
  ? (
    <div className='my-zip-progress'>
      <div className='my-bar progress'>
        <div
          className={`progress-bar progress-bar-striped ${!zip.url ? 'active' : ''}`}
          style={{ width: `${zip.progress * 100}%` }}
        />
      </div>
      <div className='my-info text-muted'>
        {zip.info}
        {' '}
        {!zip.url ? <i className='fa fa-spinner fa-pulse fa-fw' /> : null}
      </div>
      {
        zip.url
          // Zip finished.
          ? (
            <a
              className='btn btn-primary'
              href={zip.url}
              download={`${result.id}.zip`}
            >
              Save ZIP file
            </a>
          )
          // Zip in progress.
          : null
      }
    </div>
  )
  // Zip has not started.
  : (
    <button type='button' className='btn btn-primary' onClick={() => startZip(result)}>
      Download images as ZIP
    </button>
  )
))

const ResultAlbumImage = ({ result }) => {
  return (
    <div className='my-image'>
      <div className='panel panel-default'>
        <div className='panel-body'>
          <a href={result.url} target='_blank'><img src={result.url} /></a>
        </div>
        <div className='panel-footer'>
          <a className='btn btn-primary btn-xs pull-left'
            href={result.url}
            download
          >
            Download Image
          </a>
          {' '}
          <a className='btn btn-default btn-xs pull-right'
            href={utils.createObjectURL(result)}
            download={utils.getFilename(result.url) + '.json'}
          >
            Download JSON
          </a>
        </div>
      </div>
    </div>
  )
}

const ResultAlbum = ({ result }) => {
  return (
    <div className='my-result-album'>
      <div className='my-details row'>
        <div className='col-sm-6'>
          <h2>Details</h2>
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
              <span className='text-muted'>Images:</span> {result.images.length}
            </li>
            {
              result.description
              ? (
                <li>
                  <div className='text-muted'>Description:</div>
                  <pre>{result.description}</pre>
                </li>
              )
              : null
            }
            <li>
              <a className='btn btn-default'
                href={utils.createObjectURL(result)}
                download={`${result.id}.json`}
              >
                Download Album Data
              </a>
            </li>
          </ul>
        </div>
        <div className='col-sm-6'>
          <h2>Download</h2>
          <p>Download all images as a single ZIP file. Each file will also be renamed with its order in the album.</p>
          <p>Be careful when downloading large albums with many images, since all processes are done in the browser.</p>
          <DownloadAlbum />
        </div>
      </div>
      <div className='my-images'>
        {result.images.map(image => <ResultAlbumImage key={image.id} result={image} />)}
      </div>
    </div>
  )
}

export default ResultAlbum
