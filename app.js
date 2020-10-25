const chalk = require('chalk')
const notes = require('./notes.js')

const msg = notes()
console.log(chalk.black.bgGreen("Chalk Loaded!"))

console.log(msg)
