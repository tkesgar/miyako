import extract from '../lib/extract'
const expect = chai.expect

describe('extract', function() {
  describe('types', function() {
    it('should return promise', function() {
      expect(extract('http://yahallo.com/test.jpg')).to.be.a('promise')
    })

    it('should reject with Error if fails', function() {
      return extract('yahallo')
        .catch(error => {
          expect(error).to.be.instanceof(Error)
        })
    })
  })
})
