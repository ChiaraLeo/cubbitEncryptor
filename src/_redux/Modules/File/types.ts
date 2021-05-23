export type FileReducer = {
  uploadedFile: {
    file: any,
    buffer: any
  } | null,
  keyToShare: string | null,
  decryptedFile: {
    url: string,
    fileName: string
  } | null,
  encryptedFile: {
    url: string,
    fileName: string
  } | null
}
