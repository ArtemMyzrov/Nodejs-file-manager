import readline from 'readline'
import { handleCommand } from '../nwd/index.js'

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
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    rl.close()
  } else {
    handleCommand(input)
  }

  rl.prompt()
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})
