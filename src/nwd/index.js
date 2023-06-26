import fs from 'fs'
import path from 'path'

export function nwdCommand(input) {
  const command = input.split(' ')[0]

  switch (command) {
    case 'up':
      handleUp()
      break
    case 'cd':
      handleCd(input)
      break
    case 'ls':
      handleLs()
      break
    default:
      console.log(`Invalid input: ${input}`)
      break
  }
}

export function handleUp() {
  try {
    const currentDirectory = process.cwd()
    const parentDirectory = path.dirname(currentDirectory)

    if (currentDirectory === parentDirectory) {
      console.log('You are already in the root folder.')
    } else {
      process.chdir(parentDirectory)
      console.log(`Moved to parent directory: ${parentDirectory}`)
    }
  } catch (error) {
    console.log('Failed to change directory:', error.message)
  }
}

export function handleCd(input) {
  try {
    const directoryPath = input.slice(3).trim()

    fs.access(directoryPath, (error) => {
      if (error) {
        console.log(
          'Failed to change directory. Invalid path or directory does not exist.'
        )
      } else {
        process.chdir(directoryPath)
        console.log(`Moved to directory: ${directoryPath}`)
      }
    })
  } catch (error) {
    console.log('Failed to change directory:', error.message)
  }
}

export function handleLs() {
  console.log('Directory contents:')

  try {
    fs.readdir(process.cwd(), (error, contents) => {
      if (error) {
        console.log('Operation failed. Please enter a valid command.')
        return
      }

      const items = []

      contents.forEach((item, index) => {
        const fullPath = path.join(process.cwd(), item)
        fs.stat(fullPath, (error, stats) => {
          if (error) {
            console.log('Operation failed. Please enter a valid command.')
            return
          }

          const type = stats.isDirectory() ? 'Folder' : 'File'

          items.push({
            Index: index + 1,
            Name: item,
            Type: type,
          })

          if (items.length === contents.length) {
            console.table(items)
          }
        })
      })
    })
  } catch (error) {
    console.log('Operation failed:', error.message)
  }
}
