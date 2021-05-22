export type FileReducer = {
  uploadedFile: any,
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
