import { put } from '@vercel/blob'

export async function uploadToStorage(file: File): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not defined')
  }

  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return blob.url
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  // Validate file type
  const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'video/mp4', 'video/quicktime']
  const validExtensions = ['.mp3', '.wav', '.mp4', '.mov']
  
  const hasValidType = validTypes.includes(file.type)
  const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
  
  if (!hasValidType && !hasValidExtension) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload MP3, WAV, MP4, or MOV files only.'
    }
  }

  // Validate file size (max 500MB)
  const maxSize = 500 * 1024 * 1024 // 500MB in bytes
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum file size is 500MB.'
    }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
