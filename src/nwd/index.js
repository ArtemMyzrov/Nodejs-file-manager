import fs from 'fs'
import path from 'path'

export function handleCommand(input) {
  if (input === 'up') {
    handleUp()
  } else if (input.startsWith('cd')) {
    handleCd(input)
  } else if (input === 'ls') {
    handleLs()
  } else {
    console.log(`Invalid input. ${input}`)
  }
}

export function handleUp() {
  const currentDirectory = process.cwd()
  const parentDirectory = path.dirname(currentDirectory)

  if (currentDirectory === parentDirectory) {
    console.log('You are already in the root folder.')
  } else {
    process.chdir(parentDirectory)
    console.log(`Moved to parent directory: ${parentDirectory}`)
  }
}

export function handleCd(input) {
  const directoryPath = input.slice(3).trim()

  try {
    fs.accessSync(directoryPath)
    process.chdir(directoryPath)
    console.log(`Moved to directory: ${directoryPath}`)
  } catch (error) {
    console.log(
      'Failed to change directory. Invalid path or directory does not exist.'
    )
  }
}

export function handleLs() {
  console.log('Directory contents:')

  try {
    const contents = fs.readdirSync(process.cwd())
    const items = []

    contents.forEach((item, index) => {
      const fullPath = `${process.cwd()}/${item}`
      const stats = fs.statSync(fullPath)
      const type = stats.isDirectory() ? 'Folder' : 'File'

      items.push({
        Index: index + 1,
        Name: item,
        Type: type,
      })
    })

    console.table(items)
  } catch (error) {
    console.log('Operation failed. Please enter a valid command.')
  }
}
