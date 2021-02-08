module.exports = function (RED) {
  'use strict'
  const FriendlyIdNode = require('./lib/common')
  RED.nodes.registerType('friendly-id', function (config) {
    RED.nodes.createNode(this, config)

    const node = new FriendlyIdNode(config, this)

    this.on('input', node.onInput.bind(node, RED, config))
    this.on('close', node.onClose.bind(node, RED, config))
  })
}
