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
                    ["n2"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            }
        ];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            n2.on("input", function(msg) {
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
                    ["n2"]
                ]
            },
            {
                id: "n2",
                type: "helper"
            }
        ];

        helper.load(friendlyIdNode, flow, function() {
            var n1 = helper.getNode("n1");
            var n2 = helper.getNode("n2");
            n2.on("input", function(msg) {
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
});

// it('should make payload lower case', function(done) {
//     var flow = [{
//             id: "n1",
//             type: "lower-case",
//             name: "test name",
//             wires: [
//                 ["n2"]
//             ]
//         },
//         {
//             id: "n2",
//             type: "helper"
//         }
//     ];

//     helper.load(friendlyIdNode, flow, function() {
//         var n2 = helper.getNode("n2");
//         var n1 = helper.getNode("n1");
//         n2.on("input", function(msg) {
//             msg.should.have.property('payload', 'uppercase');
//             done();
//         });
//         n1.receive({ payload: "UpperCase" });
//     });
// });


/**
 * [{"id":"n1","type":"friendly-id","name":"","mode":"GENERATE-NANOID","charlen":21,"charset":"DEFAULT","customs":"","tostatus":false,"statusVal":"","statusType":"auto","inputFromVal":"","inputFromType":"auto","outputToVal":"","outputToType":"auto", "wires":[[]]}]
 */