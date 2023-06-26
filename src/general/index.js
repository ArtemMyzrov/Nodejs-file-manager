import { osCommand } from '../os/index.js'
import { calculateHash } from '../hash/index.js'
import { compressFile, decompressFile } from '../zip/index.js'
import { fsCommand } from '../fs/index.js'
import { nwdCommand } from '../nwd/index.js'

export function handleInput(input, rl) {
  if (input === '.exit') {
    rl.close()
  } else if (input.startsWith('os ')) {
    const osInput = input.slice(3).trim()
    osCommand(osInput)
  } else if (input.startsWith('hash ')) {
    const filePath = input.slice(5).trim()
    calculateHash(filePath)
      .then((fileHash) => {
        console.log(`Hash of ${filePath}: ${fileHash}`)
      })
      .catch((error) => {
        console.log(`Error calculating hash: ${error}`)
      })
  } else if (input.startsWith('compress ')) {
    const filePath = input.slice(9).trim()
    const compressedFilePath = filePath + '.br'
    compressFile(filePath, compressedFilePath)
  } else if (input.startsWith('decompress ')) {
    const filePath = input.slice(11).trim()
    const decompressedFilePath = filePath.replace('.br', '')
    decompressFile(filePath, decompressedFilePath)
  } else if (isFileSystemCommand(input)) {
    fsCommand(input)
  } else {
    nwdCommand(input)
  }
}
function isFileSystemCommand(input) {
  const fsCommands = ['cat', 'add', 'rn', 'cp', 'mv', 'rm']
  const command = input.split(' ')[0]
  return fsCommands.includes(command)
}
