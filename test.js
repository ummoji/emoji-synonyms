const test = require('tape')
const keywords = require('.')

test('keywords', function (t) {
  t.ok(Object.keys(keywords).length > 1290, 'has lots of entries')
  t.ok(Object.keys(keywords).every(key => keywords[key].length), 'each have an array of synonyms')
  t.end()
})
