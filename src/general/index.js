import readline from 'readline'

const args = process.argv.slice(2)
const usernameArg = args.find((arg) => arg.startsWith('--username='))
const username = usernameArg ? usernameArg.split('=')[1] : 'develop'
console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${process.cwd()}`)

process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})

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
    console.log(`Entered command: ${input}`)
  }
  if (input !== '.exit') {
    console.log('Invalid command. Please enter a valid command.')
  }
  if (parentDirectory !== rootDirectory) {
    process.chdir(parentDirectory)
    console.log(`You are currently in ${process.cwd()}`)
  } else {
    console.log('Cannot navigate above the root directory.')
  }

  rl.prompt()
})

rl.on('close', () => {
  process.exit()
})
