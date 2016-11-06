const path = require('path')
const emojis = require('./emojis.json')
const synonyms = require('require-dir')(path.join(__dirname, 'synonyms'))
const uniq = require('lodash.uniq')
let result = {}

Object.keys(emojis).forEach(key => {
  const emoji = emojis[key]
  let keywords = emoji.keywords || []
  let all = []
  keywords = keywords.concat(emoji.category.split('_').filter(word => word !== 'and'))

  keywords.forEach(keyword => {
    if (synonyms[keyword]) {
      all = all.concat(synonyms[keyword].map(synonym => synonym.word))
    }
  })

  all = uniq(all)

  if (all.length) result[key] = all
})

process.stdout.write(JSON.stringify(result, null, 2))
