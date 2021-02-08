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

    show(data, err) {
        this.reporter.show(data, err)
    }
}

class Reporter {
    init() {}

    close() {}

    show(data, err) {}
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

    /**
     *
     * @param {String} text
     * @param {Int} exceedsIf
     * @returns {String}
     */
    withMaxLength(text, exceedsIf = 64) {
        if (text.length > exceedsIf) {
            text = text.substr(0, exceedsIf) + '...'
        }
        return text
    }

    show(data, err) {
        let fill = 'grey'
        if (err) {
            fill = 'red'
            data = err.toString()
        }
        data = this.withMaxLength(data)
        this.node.status({ fill: fill, shape: 'dot', text: data })
    }

}