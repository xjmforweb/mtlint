#!/usr/bin/env node

const fs = require('fs').promises
const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const eslintify = require('./eslint')

async function fileDisplay(filePath) {
    const fileList = await fs.readdir(path.resolve(filePath))
    for (let i = 0; i < fileList.length; i++) {
        const tempFilePath = path.join(filePath, fileList[i])
        const file = await fs.stat(tempFilePath)
        if (file.isFile()) {
            if (path.extname(tempFilePath) !== '.vue') continue
            await fixPage(tempFilePath)
        } else {
            await fileDisplay(tempFilePath)
        }
    }
}

async function fixPage (filePath) {
    const readHandle = await fs.open(filePath, 'r')
    let content = await readHandle.readFile('utf-8')
    const styleTag = new RegExp(`<style(.|\\n)+</style>`)
    const noEmptyStyle = new RegExp(`<style[^>]*>\\s+</style>`)
    const noEmptySource = new RegExp(`(?<=\\n\\s*)[^{^\\n]+\\{\\s*\\}`, 'g')
    const noEmptyFunction = new RegExp(`\\S+\\s\\(\\S*\\)\\s\\{\\s+},?`, 'g')
    content = content.replace(noEmptyStyle, ``)
    content = content.replace(noEmptyFunction, ``)
    content = content.replace(styleTag, words => {
        return words.replace(noEmptySource, '')
    })
    await readHandle.close()
    const writeHandle = await fs.open(path.resolve(filePath), 'w')
    await writeHandle.writeFile(content)
    await writeHandle.close()
}

program
    .version('1.0.0')
    .command(`fix`)
    .action(async () => {
        await fileDisplay('./src')
        console.log(chalk.blue('ok！^_^'))
    })

program.parse(process.argv)