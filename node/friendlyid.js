module.exports = function(RED) {
    "use strict";

    const shortid = require('short-uuid');
    const { nanoid, customAlphabet } = require('nanoid');
    const nanodict = require('nanoid-dictionary');

    function FriendlyIdNode(definition) {
        RED.nodes.createNode(this, definition);
        var node = this;

        if (definition.tostatus) {
            node.status({ fill: "grey", shape: "ring" });
        }

        node.on("close", function() {
            node.status({});
        })
        node.on("input", function(msg, send, done) {
            send = send || (() => node.send.apply(node, arguments));

            var input = RED.util.getMessageProperty(msg, "payload");
            request(node, msg, definition, function(data, err) {
                if (err) {
                    if (done) {
                        done(err);
                    } else {
                        node.error(err, msg);
                    }
                    if (definition.tostatus) {
                        node.status({ fill: "red", shape: "dot", text: "Failed" });
                    }
                } else {
                    RED.util.setMessageProperty(msg, "payload", data, false);
                    send(msg);
                    if (done) {
                        done();
                    }
                    if (definition.tostatus) {
                        var output = "";
                        if (definition.statusType === "input") {
                            output = input;
                        } else {
                            var targetVal = "payload";
                            if (definition.statusType === "msg") {
                                targetVal = definition.statusVal || "payload";
                            }
                            output = RED.util.getMessageProperty(msg, targetVal);
                        }
                        if (output.length > 64) {
                            output = output.substr(0, 64) + "...";
                        }
                        node.status({ fill: "grey", shape: "dot", text: output });
                    }
                }
            })
        });
    }

    function generate_nanoid(node, msg, definition) {
        var size = Number(definition.charlen);
        switch (definition.charset) {
            case "DEFAULT":
                return nanoid(size)

            case "NUMERIC":
                return customAlphabet(nanodict.numbers, size)()

            case "LOWERCASE":
                return customAlphabet(nanodict.lowercase, size)()

            case "UPPERCASE":
                return customAlphabet(nanodict.uppercase, size)()

            case "ALPHANUMERIC":
                return customAlphabet(nanodict.numbers + nanodict.lowercase + nanodict.uppercase, size)()

            case "NO-LOOKALIKES":
                return customAlphabet(nanodict.nolookalikes, size)()

            case "NO-LOOKALIKES-SAFE":
                return customAlphabet(nanodict.nolookalikesSafe, size)()

            case "CUSTOM":
                return customAlphabet(definition.customs, size)()
        }
    }

    function request(node, msg, definition, callback) {
        try {
            var mode = definition.mode;
            if (mode === "GENERATE-NANOID") {
                callback(generate_nanoid(node, msg, definition), null);
            } else if (mode === "GENERATE-SHORTID") {
                callback(shortid().new(), null);
            } else {
                // converts UUIDs using short-uuid
                var input = RED.util.getMessageProperty(msg, "payload")
                if (mode === "DECODE") {
                    // friendly-id -> uuid
                    callback(shortid().toUUID(input), null);
                } else if (mode === "ENCODE") {
                    // uuid -> friendly-id
                    callback(shortid().fromUUID(input), null);
                } else {
                    // undefined
                    callback(null, Error(RED._("label.mode.undefiend")))
                }
            }
        } catch (e) {
            callback(null, e);
        }
    }
    RED.nodes.registerType("friendly-id", FriendlyIdNode);
};