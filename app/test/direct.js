import { pattern, run } from '../lib/mods/direct'
const expect = chai.expect

const acceptedTests = {
  'url .gif': {
    url: 'http://yahallo.com/test.gif',
    name: 'test'
  },
  'url .jpeg': {
    url:'http://yahallo.com/test.jpeg',
    name: 'test'
  },
  'url .jpg': {
    url: 'http://yahallo.com/test.jpg',
    name: 'test'
  },
  'url .png': {
    url: 'http://yahallo.com/test.png',
    name: 'test'
  },
  'url with extra slash': {
    url: 'http://yahallo.com/test.png/revision/latest',
    name: 'test'
  },
  'url with extra slash with query': {
    url: 'http://yahallo.com/test.png/revision/latest?resize=1200&cache=abc',
    name: 'test'
  },
  'url with query': {
    url: 'http://yahallo.com/test.png?resize=1200&cache=abc',
    name: 'test'
  },
  'url without extension': {
    url: 'http://yahallo.com/test',
    name: 'test'
  },
  'url without extension with query': {
    url: 'http://yahallo.com/test?resize=1200&cache=abc',
    name: 'test'
  },
  'url without protocol': {
    url: 'yahallo.com/test.png#123',
    name: 'test'
  },
  'url with double slash': {
    url: '//yahallo.com/test.png#123',
    name: 'test'
  }
}

const rejectedTests = {
  'string': 'Yahallo!'
}

describe('direct', function() {
  describe('type', function() {
    it('should return promise', function() {
      expect(run('http://yahallo.com/test.jpg')).to.be.a('promise')
    })

    it('should resolve with #src and #name string', function() {
      return run('http://yahallo.com/test.jpg')
        .then(({ name, src }) => {
          expect(name).to.be.a('string')
          expect(src).to.be.a('string')
        })
    })

    it('should reject with #message', function() {
      return run('yahallo')
        .catch(({ message }) => {
          expect(message).to.be.a('string')
        })
    })
  })

  describe('pattern', function() {
    for (let testcase in acceptedTests) {
      let url = acceptedTests[testcase].url
      it('should accept ' + testcase, function() {
        expect(url).to.match(pattern)
      })
    }

    for (let testcase in rejectedTests) {
      let url = rejectedTests[testcase].url
      it('should reject ' + testcase, function() {
        expect(url).not.to.match(pattern)
      })
    }
  })

  describe('src', function() {
    it('should return the url', function() {
      let url = 'http://yahallo.com/test.png'
      return run(url)
        .then(({ src }) => {
          expect(src).to.equal(url)
        })
    })
  })

  describe('name', function() {
    for (let testcase in acceptedTests) {
      let test = acceptedTests[testcase]
      it('should extract filename from ' + testcase, function() {
        return run(test.url)
          .then(({ name }) => {
            expect(name).to.equal(test.name)
          })
      })
    }
  })
})
