const args = process.argv.slice(2)
const usernameArg = args.find((arg) => arg.startsWith('--username='))
const username = usernameArg ? usernameArg.split('=')[1] : 'develop'
console.log(`Welcome to the File Manager, ${username}!`)

process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})

process.stdin.on('data', (data) => {
  const input = data.toString().trim()
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.exit()
  }
})
