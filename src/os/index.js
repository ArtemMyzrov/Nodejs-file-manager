import os from 'os'

export function osCommand(input) {
  switch (input) {
    case '--EOL':
      getEOL()
      break
    case '--cpus':
      getCPUs()
      break
    case '--homedir':
      getHomeDir()
      break
    case '--username':
      getUsername()
      break
    case '--architecture':
      getArchitecture()
      break
    default:
      console.log('Invalid command. Please enter a valid command.')
      break
  }
}

function getEOL() {
  const eol = os.EOL
  console.log(`Default End-of-Line (EOL) Character: ${JSON.stringify(eol)}`)
}

function getCPUs() {
  const cpus = os.cpus()
  console.log(`Number of CPUs: ${cpus.length}`)
  cpus.forEach((cpu, index) => {
    const { model, speed } = cpu
    console.log(`CPU ${index + 1}: ${model} (${(speed / 1000).toFixed(2)} GHz)`)
  })
}

function getHomeDir() {
  const homedir = os.homedir()
  console.log(`Home Directory: ${homedir}`)
}

function getUsername() {
  const username = os.userInfo().username
  console.log(`Current System User: ${username}`)
}

function getArchitecture() {
  const architecture = process.arch
  console.log(`Node.js CPU Architecture: ${architecture}`)
}
