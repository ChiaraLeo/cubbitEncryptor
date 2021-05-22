export enum ConstString {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  DOWNLOAD= 'DOWNLOAD',
  FOOTER = 'FOOTER',
  SWITCHLABEL1 = 'SWITCHLABEL1',
  SWITCHLABEL2 = 'SWITCHLABEL2',
  SELECTFILE = 'SELECTFILE',
  DROPFILEHERE = 'DROPFILEHERE',
  DECRYPT = 'DECRYPT',
  ENCRYPT = 'ENCRYPT',
  INSERTYOURKEY = 'INSERTYOURKEY',
  YOURENCRYPTIONKEY = 'YOURENCRYPTIONKEY'
}

export const encryptStrings = {
  [ConstString.DOWNLOAD]: `Download`,
  [ConstString.INSERTYOURKEY]: `Insert your key:`,
  [ConstString.YOURENCRYPTIONKEY]: `Your encryption key:`,
  [ConstString.DROPFILEHERE]: `or drop file here`,
  [ConstString.DECRYPT]: `Decrypt`,
  [ConstString.ENCRYPT]: `Encrypt`,
  [ConstString.TITLE]: `Cubbit encryptor`,
  [ConstString.SUBTITLE]: `Advanced online file encryption and decryption. Secure any file type and maintain your privacy!`,
  [ConstString.SWITCHLABEL1]: `English`,
  [ConstString.SWITCHLABEL2]: `Encrypted`,
  [ConstString.SELECTFILE]: `Choose file!`,
  [ConstString.FOOTER]: `The whole is never the sum of the parts - it is greater or lesser, depending on how wel the individuals work together`
}
