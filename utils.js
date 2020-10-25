const { Module } = require("module")

console.log('utils.js')

const name ='James'

const add = function (x, y) {
    return x + y
}

module.exports = add