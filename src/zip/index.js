import fs from 'fs'
import zlib from 'zlib'
import { pipeline } from 'stream'

export function compressFile(filePath, destinationPath) {
  const source = fs.createReadStream(filePath)
  const destination = fs.createWriteStream(destinationPath)
  const brotli = zlib.createBrotliCompress()

  pipeline(source, brotli, destination, (error) => {
    if (error) {
      console.error('Compression failed:', error)
    } else {
      console.log('File compressed successfully.')
    }
  })
}

export function decompressFile(filePath, destinationPath) {
  const source = fs.createReadStream(filePath)
  const destination = fs.createWriteStream(destinationPath)
  const brotli = zlib.createBrotliDecompress()

  pipeline(source, brotli, destination, (error) => {
    if (error) {
      console.error('Decompression failed:', error)
    } else {
      console.log('File decompressed successfully.')
    }
  })
}
