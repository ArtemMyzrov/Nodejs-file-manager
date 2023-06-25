import fs from 'fs'
import crypto from 'crypto'

const args = process.argv.slice(2)
const filePath = args[0]

export function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256')

    const input = fs.createReadStream(filePath)

    input.on('data', (data) => {
      hash.update(data)
    })

    input.on('end', () => {
      const fileHash = hash.digest('hex')
      resolve(fileHash)
    })

    input.on('error', (error) => {
      reject(error)
    })
  })
}
