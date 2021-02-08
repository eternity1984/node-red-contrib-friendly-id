const shortid = require('short-uuid')
const { nanoid, customAlphabet } = require('nanoid')
const nanodict = require('nanoid-dictionary')

/**
 *
 * @param {Object} config
 * @returns {Action}
 */
module.exports = function (config) {
  switch (config.mode) {
    case 'GENERATE-NANOID':
      return new GenerateNanoID(config)
    case 'GENERATE-SHORTID':
      return new GenerateShortID()
    case 'GENERATE-UUID4':
      return new GenerateUUID4()
    case 'DECODE':
      return new ConvertToUUID()
    case 'ENCODE':
      return new ConvertFromUUID()
  }
  return undefined
}

class Action {
  /**
     *
     * @param {String} input
     * @returns {String}
     */
  exec (input) {
    throw Error('Not implemented yet')
  }

  /**
     * @returns {Boolean}
     */
  ignoreInput () {
    return false
  }
}

class GenerateUUID4 extends Action {
  exec (input) {
    return shortid().uuid()
  }

  ignoreInput () {
    return true
  }
}

class GenerateShortID extends Action {
  exec (input) {
    return shortid().new()
  }

  ignoreInput () {
    return true
  }
}

class GenerateNanoID extends Action {
  constructor (config) {
    super()
    this.config = config
    this.charsets = {
      NUMERIC: nanodict.numbers,
      LOWERCASE: nanodict.lowercase,
      UPPERCASE: nanodict.uppercase,
      ALPHANUMERIC: nanodict.numbers + nanodict.lowercase + nanodict.uppercase,
      'NO-LOOKALIKES': nanodict.nolookalikes,
      'NO-LOOKALIKES-SAFE': nanodict.nolookalikesSafe
    }
  }

  exec (input) {
    const size = Number(this.config.charlen)
    if (this.config.charset in this.charsets) {
      return customAlphabet(this.charsets[this.config.charset], size)()
    } else if (this.config.charset === 'CUSTOM') {
      return customAlphabet(this.config.customs, size)()
    } else {
      // DEFAULT
      return nanoid(size)
    }
  }

  ignoreInput () {
    return true
  }
}

class ConvertToUUID extends Action {
  exec (input) {
    return shortid().toUUID(input)
  }
}

class ConvertFromUUID extends Action {
  exec (input) {
    return shortid().fromUUID(input)
  }
}
