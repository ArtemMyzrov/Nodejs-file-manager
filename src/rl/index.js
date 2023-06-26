import readline from 'readline'
import { handleInput } from '../general/index.js'
import { username } from '../index.js'

export function inputHandler() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  })

  rl.prompt()

  rl.on('line', (input) => {
    input = input.trim()
    handleInput(input, rl)
    rl.prompt()
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.exit()
  })
}
