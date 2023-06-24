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

function readFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    console.log(`Content of ${filePath}:\n${content}`)
  } catch (error) {
    console.log(`Error reading file: ${error.message}`)
  }
}

function createFile(fileName) {
  try {
    fs.writeFileSync(fileName, '')
    console.log(`Created file: ${fileName}`)
  } catch (error) {
    console.log(`Error creating file: ${error.message}`)
  }
}

function renameFile(oldPath, newPath) {
  try {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath)
      console.log(`Renamed file: ${oldPath} -> ${newPath}`)
    } else {
      console.log(`File not found: ${oldPath}`)
    }
  } catch (error) {
    console.log(`Error renaming file: ${error.message}`)
  }
}

function copyFile(sourcePath, targetPath) {
  const readStream = fs.createReadStream(sourcePath)
  const writeStream = fs.createWriteStream(targetPath)

  readStream.on('error', (error) => {
    console.log(`Error reading file: ${error.message}`)
  })

  writeStream.on('error', (error) => {
    console.log(`Error writing file: ${error.message}`)
  })

  writeStream.on('finish', () => {
    console.log(`Copied file: ${sourcePath} -> ${targetPath}`)
  })

  readStream.pipe(writeStream)
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
    try {
      fs.unlinkSync(sourcePath)
      console.log(`Moved file: ${sourcePath} -> ${targetPath}`)
    } catch (error) {
      console.log(`Error moving file: ${error.message}`)
    }
  })

  readStream.pipe(writeStream)
}

function deleteFile(filePath) {
  try {
    const exists = fs.existsSync(filePath)
    if (!exists) {
      console.log(`File does not exist: ${filePath}`)
      return
    }

    fs.unlinkSync(filePath)
    console.log(`Deleted file: ${filePath}`)
  } catch (error) {
    console.log(`Error deleting file: ${error.message}`)
  }
}
