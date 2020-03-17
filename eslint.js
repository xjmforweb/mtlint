const { exec } = require('child_process')
const path = require('path')

const SEPARATOR = process.platform === 'win32' ? ';' : ':'
const env = Object.assign({}, process.env);

env.Path = path.resolve('./node_modules/.bin') + SEPARATOR + process.env.PATH

const option = {
    env: env,
    cwd: process.cwd()
}
// stylelint 'src/**/*.vue' --fix"
module.exports = function () {
    exec('eslint --fix --ext .vue src', option, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(stdout)
    })
}