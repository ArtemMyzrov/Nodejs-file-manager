import { inputHandler } from './rl/index.js'

const args = process.argv.slice(2)
const usernameArg = args.find((arg) => arg.startsWith('--username='))
export const username = usernameArg ? usernameArg.split('=')[1] : 'develop'

console.log(`Welcome to the File Manager, ${username}!`)
console.log(`You are currently in ${process.cwd()}`)

inputHandler()
