import readline from 'readline'
import { handleCommand } from '../nwd/index.js'
import { fsCommand } from '../fs/index.js'
import { osCommand } from '../os/index.js'
import { calculateHash } from '../hash/index.js'

const args = process.argv.slice(2)
const usernameArg = args.find((arg) => arg.startsWith('--username='))
const username = usernameArg ? usernameArg.split('=')[1] : 'develop'
console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${process.cwd()}`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
})

rl.prompt()

rl.on('line', (input) => {
  input = input.trim()

  if (input === '.exit') {
    rl.close()
  } else if (input.startsWith('os ')) {
    const osInput = input.slice(3).trim()
    osCommand(osInput)
  } else if (input.startsWith('hash ')) {
    const filePath = input.slice(5).trim()
    calculateHash(filePath)
      .then((fileHash) => {
        console.log(`Hash of ${filePath}: ${fileHash}`)
      })
      .catch((error) => {
        console.log(`Error calculating hash: ${error}`)
      })
  } else if (isFileSystemCommand(input)) {
    fsCommand(input)
  } else {
    handleCommand(input)
  }

  rl.prompt()
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})

function isFileSystemCommand(input) {
  const fsCommands = ['cat', 'add', 'rn', 'cp', 'mv', 'rm']
  const command = input.split(' ')[0]
  return fsCommands.includes(command)
}
