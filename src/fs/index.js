import fs from 'fs'

export function fsCommand(input) {
  const command = input.split(' ')[0]
  const args = input.split(' ').slice(1)

  switch (command) {
    case 'cat':
      readFile(args[0])
      break
    case 'add':
      createFile(args[0])
      break
    case 'rn':
      renameFile(args[0], args[1])
      break
    case 'cp':
      copyFile(args[0], args[1])
      break
    case 'mv':
      moveFile(args[0], args[1])
      break
    case 'rm':
      deleteFile(args[0])
      break
    default:
      console.log('Invalid command. Please enter a valid command.')
      break
  }
}

async function readFile(filePath) {
  try {
    const content = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
    console.log(`Content of ${filePath}:\n${content}`)
  } catch (error) {
    console.log(`Error reading file: ${error.message}`)
  }
}

async function createFile(fileName) {
  try {
    await new Promise((resolve, reject) => {
      fs.writeFile(fileName, '', (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    console.log(`Created file: ${fileName}`)
  } catch (error) {
    console.log(`Error creating file: ${error.message}`)
  }
}

async function renameFile(oldPath, newPath) {
  try {
    await new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    console.log(`Renamed file: ${oldPath} -> ${newPath}`)
  } catch (error) {
    console.log(`Error renaming file: ${error.message}`)
  }
}

async function copyFile(sourcePath, targetPath) {
  try {
    const readStream = fs.createReadStream(sourcePath)
    const writeStream = fs.createWriteStream(targetPath)

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream)

      readStream.on('error', (error) => {
        reject(error)
      })

      writeStream.on('error', (error) => {
        reject(error)
      })

      writeStream.on('finish', () => {
        resolve()
      })
    })

    console.log(`Copied file: ${sourcePath} -> ${targetPath}`)
  } catch (error) {
    console.log(`Error copying file: ${error.message}`)
  }
}

function moveFile(sourcePath, targetPath) {
  const readStream = fs.createReadStream(sourcePath)
  const writeStream = fs.createWriteStream(targetPath)

  readStream.on('error', (error) => {
    console.log(`Error reading file: ${error.message}`)
  })

  writeStream.on('error', (error) => {
    console.log(`Error writing file: ${error.message}`)
  })

  writeStream.on('finish', () => {
    fs.unlink(sourcePath, (error) => {
      if (error) {
        console.log(`Error moving file: ${error.message}`)
      } else {
        console.log(`Moved file: ${sourcePath} -> ${targetPath}`)
      }
    })
  })

  readStream.pipe(writeStream)
}

async function deleteFile(filePath) {
  try {
    await new Promise((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    console.log(`Deleted file: ${filePath}`)
  } catch (error) {
    console.log(`Error deleting file: ${error.message}`)
  }
}
