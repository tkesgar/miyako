import React from 'react'
import { connect } from 'react-redux'

import ResultPhoto from './photo'
import ResultAlbum from './album'

const Result = ({ result }) => {
  if (result) {
    return (
      <div className='panel panel-primary' style={{margin: '20px auto'}}>
        <div className='panel-heading'>Result</div>
        <div className='panel-body'>
          {getResultElement(result)}
        </div>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => ({
  result: state.result
})

const mapDispatchToProps = null

const ResultContainer = connect(mapStateToProps, mapDispatchToProps)(Result)

export default ResultContainer

function getResultElement (result) {
  let type = result.type
  switch (type) {
    case 'photo':
      return <ResultPhoto result={result} />
    case 'album':
      return <ResultAlbum result={result} />
    default:
      throw new Error(`Unknown result type: ${type}`)
  }
}
