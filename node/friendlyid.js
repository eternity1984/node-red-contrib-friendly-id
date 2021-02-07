module.exports = function(RED) {
    'use strict'
    const makeAction = require('./lib/actions')
    const makeStatus = require('./lib/status')

    class FriendlyIdNode {
        constructor(config) {
            this.config = config;
            this.nodeStatus = makeStatus(this, config)
            RED.nodes.createNode(this, config)

            this.nodeStatus.init()

            this.on("input", this.onInput.bind(this));
            this.on('close', this.onClose.bind(this));
        }

        onClose() {
            this.nodeStatus.close()
        }

        onInput(msg, send, done) {
            this.request(msg, (data, err) => {
                if (err) {
                    this.onError(msg, send, done, err)
                } else {
                    this.onSuccess(msg, send, done, data)
                }
            })
        }

        onSuccess(msg, send, done, data) {
            // For maximum backwards compatibility, check that send exists.
            // If this node is installed in Node-RED 0.x, it will need to
            // fallback to using `node.send`
            send = send || function() { this.send.apply(this, arguments) }

            this.setMessageProperty(msg, this.config, data)
            send(msg)
            if (done) {
                done()
            }
            let text = this.getStatusMessage(msg, this.config, data)
            this.nodeStatus.success(text)
        }

        onError(msg, send, done, err) {
            if (done) {
                done(err)
            } else {
                this.error(err, msg)
            }
            this.nodeStatus.error(err)
        }

        /**
         * 
         * @param {*} msg 
         * @param {(data, err) => void} callback 
         */
        request(msg, callback) {
            try {
                let action = makeAction(this.config)
                if (action === undefined) {
                    throw Error(RED._('label.mode.undefined'))
                }
                let data = action.exec(this.getMessageProperty(msg, this.config))
                callback(data, null)

            } catch (e) {
                callback(null, e)
            }
        }

        getStatusMessage(msg, config, data) {
            var output = ''
            if (config.statusType === 'auto') {
                output = data
            } else if (config.statusType === 'msg') {
                output = RED.util.getMessageProperty(msg, config.statusVal)
            }
            return output
        }

        /**
         * 
         * @param {Object} msg 
         * 		the message object
         * @param {Object} config 
         * 		the config object
         * @returns {String}
         */
        getMessageProperty(msg, config) {
            let prop = "payload" // auto
            if (config.inputFromType === 'msg') {
                prop = config.inputFromVal
            }
            let input = RED.util.getMessageProperty(msg, prop)
            if (input === undefined) {
                throw Error('Missing input property: msg.' + target)
            }
            return input
        }

        /**
         * 
         * @param {Object} msg	
         * 		the message object
         * @param {Object} config
         * 		the config object
         * @param {*} value
         * 		the value to set
         */
        setMessageProperty(msg, config, value) {
            let prop = "payload" // auto
            if ((config.outputToType === 'inplace') && (config.inputFromType === 'msg')) {
                prop = config.inputFromVal
            } else if (config.outputToType === 'msg') {
                prop = config.outputToVal
            }
            RED.util.setMessageProperty(msg, prop, value, true)
        }

    }
    RED.nodes.registerType('friendly-id', FriendlyIdNode)
}