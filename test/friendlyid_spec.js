var should = require("should");
var helper = require("node-red-node-test-helper");
var friendlyIdNode = require("../node/friendlyid.js");

helper.init(require.resolve("node-red"));

describe("friendly-id Node", function() {

    beforeEach(function(done) {
        helper.startServer(done);
    });

    afterEach(function(done) {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', function(done) {
        var flow = [{
            id: "n1",
            type: "friendly-id",
            name: "friendly id"
        }];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            n1.should.have.property('name', 'friendly id');
            done();
        });
    });

    it('should convert a UUID to a friendly-id', function(done) {
        var flow = [{
                id: "n1",
                type: "friendly-id",
                mode: "ENCODE",
                wires: [
                    ["nh"]
                ]
            },
            {
                id: "nh",
                type: "helper"
            }
        ];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            var nh = helper.getNode("nh");
            nh.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 'mhvXdrZT4jP5T8vBxuvm75');
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({ payload: "a44521d0-0fb8-4ade-8002-3385545c3318" });
        });
    });

    it('should convert a friendly-id to a UUID', function(done) {
        var flow = [{
                id: "n1",
                type: "friendly-id",
                mode: "DECODE",
                wires: [
                    ["nh"]
                ]
            },
            {
                id: "nh",
                type: "helper"
            }
        ];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            var nh = helper.getNode("nh");
            nh.on("input", function(msg) {
                try {
                    msg.should.have.property('payload', 'a44521d0-0fb8-4ade-8002-3385545c3318');
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({ payload: "mhvXdrZT4jP5T8vBxuvm75" });
        });
    });

    it('should generate a random', function(done) {
        var flow = [{
                id: "n1",
                type: "friendly-id",
                mode: "GENERATE-UUID4",
                wires: [
                    ["nh"]
                ]
            },
            {
                id: "nh",
                type: "helper"
            }
        ];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            var nh = helper.getNode("nh");
            nh.on("input", function(msg) {
                try {
                    msg.should.have.ownProperty('payload');
                    msg.payload.should.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
                    done();
                } catch (err) {
                    done(err);
                }
            });
            n1.receive({});
        });
    });

});