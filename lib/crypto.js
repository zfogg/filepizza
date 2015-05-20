import CryptoJS from 'crypto-js'

/**
 * Encrypts and decrypts stream ciphers using a key that is given or generated
 * at construction.
 *
 * The module encrypts if no key is given and decrypts using the key if it was.
 *
 * @class Crypto
 */
export default class Crypto {

  /**
   * Sets the object up to either decrypt or encrypt.
   * @param {?string} key Key used to decrypt cipher. If null, will generate key and encrypt.
   * @constructs
   */
  constructor(key) {
    if (!key) {
      key = Crypto.generateKey()
      this.crypto = CryptoJS.algo.AES.createEncryptor(key)
    } else {
      this.crypto = CryptoJS.algo.AES.createDecryptor(key)
    }
    this.key = key
  }

  /**
   * Process the next block in the stream cipher
   * @param {string} text Ciphertext or plaintext part
   */
  process(text) {
    return this.crypto.process(text)
  }

  /**
   * Finalize the encryption/decryption of the cipher stream.
   * @return {string} Ciphertext (encryption) or Plaintext (decryption)
   */
  finalize() {
    return this.crypto.finalize()
  }

  /**
   * Get's the encryption/decryption key
   * @return {string} Key
   */
  getKey() {
    return this.key
  }

  /**
   * Generates a URL safe key
   * @returns {string}
   */
  static generateKey() {
    var output = ""
    for (var i=0; i<4; i++) {
      output += Crypto.generateSeq()
    }
    return output
  }

  /**
   * Generates a short sequence of pseudorandom characters
   * @returns {string} Pseudorandom string
   */
  static generateSeq() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    }
}
