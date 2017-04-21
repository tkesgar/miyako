import JSZip from 'jszip'

import * as utils from 'lib/utils'

function createZip (urls, progress) {
  let urlCompleted = 0
  let urlPromises = urls.map((url, index) => new Promise((resolve, reject) => {
    let xhr = new window.XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = (e) => {
      let arrayBuffer = xhr.response
      if (arrayBuffer) {
        let file = utils.getFullFilename(url)
        let ext = utils.getFileExt(url)
        progress(++urlCompleted / urls.length, `Downloading ${file}...`)
        resolve({
          filename: `${index + 1}.${ext}`,
          arrayBuffer: arrayBuffer
        })
      }
    }
    xhr.send(null)
  }))

  return Promise.all(urlPromises)
    .then((arrayBuffers) => {
      let zip = new JSZip()

      for (let { filename, arrayBuffer } of arrayBuffers) {
        zip.file(filename, arrayBuffer)
      }

      return zip.generateAsync({
        type: 'blob',
        onUpdate: (percent, file) => progress(
          50 + percent / 20,
          `Compressing ${file}...`
        )
      })
    })
}

export default createZip
