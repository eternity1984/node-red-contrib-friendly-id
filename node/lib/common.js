const makeAction = require('./actions')
const makeStatus = require('./status')

class FriendlyIdNode {
  constructor (config, node) {
    this.node = node
    this.nodeStatus = makeStatus(node, config)
    this.nodeStatus.init()
  }

  onClose (RED, config) {
    this.nodeStatus.close()
  }

  onInput (RED, config, msg, send, done) {
    this.request(RED, config, msg, (data, err) => {
      if (err) {
        this.onError(RED, config, msg, send, done, err)
      } else {
        this.onSuccess(RED, config, msg, send, done, data)
      }
    })
  }

  onSuccess (RED, config, msg, send, done, data) {
    // For maximum backwards compatibility, check that send exists.
    // If this node is installed in Node-RED 0.x, it will need to
    // fallback to using `node.send`
    send = send || function () { this.node.send.apply(this.node, arguments) }

    this.setMessageProperty(RED, config, msg, data)
    send(msg)
    if (done) {
      done()
    }
    const text = this.getStatusMessage(RED, config, msg, data)
    this.nodeStatus.show(text, null)
  }

  onError (RED, config, msg, send, done, err) {
    if (done) {
      done(err)
    } else {
      this.node.error(err, msg)
    }
    this.nodeStatus.show(null, err)
  }

  /**
     *
     * @param {*} msg
     * @param {(data, err) => void} callback
     */
  request (RED, config, msg, callback) {
    try {
      const action = makeAction(config)
      if (action === undefined) {
        throw Error(RED._('label.mode.undefined'))
      }
      let input = ''
      if (!(action.ignoreInput())) {
        input = this.getMessageProperty(RED, config, msg)
      }
      const data = action.exec(input)
      callback(data, null)
    } catch (e) {
      callback(null, e)
    }
  }

  getStatusMessage (RED, config, msg, data) {
    var output = ''
    if (config.statusType === 'auto') {
      output = data
    } else if (config.statusType === 'msg') {
      output = RED.util.getMessageProperty(msg, config.statusVal)
      if (output === undefined) {
        throw Error('Missing status property: msg.' + config.statusVal)
      }
    }
    return output
  }

  /**
     *
     * @param {*} RED
     * @param {Object} config the config object
     * @param {Object} msg the message object
     * @returns {String}
     */
  getMessageProperty (RED, config, msg) {
    let prop = 'payload' // auto
    if (config.inputFromType === 'msg') {
      prop = config.inputFromVal
    }
    const input = RED.util.getMessageProperty(msg, prop)
    if (input === undefined) {
      throw Error('Missing input property: msg.' + prop)
    }
    return input
  }

  /**
     *
     * @param {*} RED
     * @param {Object} config the config object
     * @param {Object} msg the message object
     * @param {*} value the value to set
     */
  setMessageProperty (RED, config, msg, value) {
    let prop = 'payload' // auto
    if ((config.outputToType === 'inplace') && (config.inputFromType === 'msg')) {
      prop = config.inputFromVal
    } else if (config.outputToType === 'msg') {
      prop = config.outputToVal
    }
    RED.util.setMessageProperty(msg, prop, value, true)
  }
}
module.exports = FriendlyIdNode
