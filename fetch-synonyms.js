const async = require('async')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(1, 500)  // 1 request per 500ms
const exists = require('path-exists').sync
const thes = require('powerthesaurus-api')
const emojis = require('./emojis.json')

// Collect all keywords
var keywords = []
Object.keys(emojis).forEach(key => {
  var emoji = emojis[key]
  keywords = keywords.concat(emoji.keywords)
})

console.log(keywords)

async.map(
  keywords,

  function (keyword, callback) {
      var filename = path.join(__dirname, 'words', `${keyword}.json`)

      if (exists(filename)) {
        console.log(`${keyword} (exists)`)
        return callback(null)
      }

      console.log(`${keyword}`)
      limiter.removeTokens(1, () => {
        thes(keyword).then(results => {
          fs.writeFileSync(filename, JSON.stringify(results, null, 2))
          return callback(null)
        })
        .catch(error => {
          return callback(error)
        })
      })
  },

  function (err) {
    if (err) throw err
    process.exit()
  }
)
