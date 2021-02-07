/**
 * 
 * @param {*} node 
 * @param {Object} config
 * @returns {NodeStatus} 
 */
module.exports = function(node, config) {
    return new NodeStatus((config.tostatus) ? new ActiveReporter(node) : new Reporter())
}

class NodeStatus {

    constructor(reporter) {
        this.reporter = reporter
    }

    init() {
        this.reporter.init()
    }

    close() {
        this.reporter.close()
    }

    success(text) {
        this.reporter.success(text)
    }

    error(text) {
        this.reporter.error(text)
    }
}

class Reporter {

    init() {}

    close() {}

    success(text) {}

    error(text) {}
}

class ActiveReporter extends Reporter {
    constructor(node) {
        super()
        this.node = node
    }

    init() {
        this.node.status({ fill: 'grey', shape: 'ring' })
    }

    close() {
        this.node.status({})
    }

    success(text) {
        if (text.length > 64) {
            text = text.substr(0, 64) + '...'
        }
        this.node.status({ fill: 'grey', shape: 'dot', text: text })
    }

    error(text) {
        this.node.status({ fill: 'red', shape: 'dot', text: 'Failed' })
    }
}