var helper = require('node-red-node-test-helper')
var friendlyIdNode = require('../node/friendlyid.js')

helper.init(require.resolve('node-red'))

describe('friendly-id Node tests', function() {
    beforeEach(function(done) {
        helper.startServer(done)
    })

    afterEach(function(done) {
        helper.unload()
        helper.stopServer(done)
    })

    describe('common', function() {
        it('should be loaded', function(done) {
            const flow = [{
                id: 'n1',
                type: 'friendly-id',
                name: 'friendly id'
            }]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                n1.should.have.property('name', 'friendly id')
                done()
            })
        })

        it('should be catched errors', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                },
                {
                    id: 'ns',
                    type: 'catch',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.error.should.have.property('message', 'Error: Missing input property: msg.payload')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ topic: '' })
            })
        })


        it('should be catched errors, undefined mode', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'NONE',
                },
                {
                    id: 'ns',
                    type: 'catch',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.error.should.have.property('message')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ topic: '' })
            })
        })

    })

    describe('node status', function() {
        it('should be displayed in same status as output, i:msg, o:auto, s:auto', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                    inputFromType: "msg",
                    inputFromVal: "uuid",
                    tostatus: true,
                    statusType: 'auto'
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ uuid: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
            })
        })

        it('should be displayed in same status as output, i:msg, o:msg, s:auto', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                    inputFromType: "msg",
                    inputFromVal: "uuid",
                    outputToType: "msg",
                    outputToVal: "other",
                    tostatus: true,
                    statusType: 'auto'
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ uuid: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
            })
        })


        it('should be displayed in same status as output, i:msg, o:inplace, s:auto', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                    inputFromType: "msg",
                    inputFromVal: "uuid",
                    outputToType: "inplace",
                    tostatus: true,
                    statusType: 'auto'
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ uuid: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
            })
        })

        it('should be displayed in status at most 64 chars', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-UUID4',
                    tostatus: true,
                    statusVal: 'topic',
                    statusType: 'msg'
                },
                {
                    id: 'nh',
                    type: 'helper'
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text').lengthOf(64 + 3)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ topic: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' })
            })
        })

        it('should be catched errors', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                    tostatus: true,
                    statusType: 'auto'
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text', 'Error: Missing input property: msg.payload')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ topic: '' })
            })
        })

        it('should be catched errors, missing statusVal', function(done) {
            const flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-UUID4',
                    tostatus: true,
                    statusType: "msg",
                    statusVal: "dummy"
                },
                {
                    id: 'ns',
                    type: 'status',
                    scope: ['n1'],
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]
            helper.load(friendlyIdNode, flow, function() {
                const n1 = helper.getNode('n1')
                const nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.status.should.have.property('text')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ topic: '' })
            })
        })

    })

    describe('convert', function() {
        it('should be converted to a uuid', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'DECODE',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'a44521d0-0fb8-4ade-8002-3385545c3318')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'mhvXdrZT4jP5T8vBxuvm75' })
            })
        })

        it('should be converted to a shortid', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'ENCODE',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload', 'mhvXdrZT4jP5T8vBxuvm75')
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
            })
        })
    });


    describe('generate', function() {
        it('uuid', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-UUID4',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').lengthOf(36)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('shortid', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-SHORTID',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').lengthOf(22)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })


        it('nanoid, charset:(none)', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[0-9A-Za-z_-]+$/)
                        msg.should.have.property('payload').lengthOf(21)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:default', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'DEFAULT',
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[0-9A-Za-z_-]+$/)
                        msg.should.have.property('payload').lengthOf(21)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })


        it('nanoid, charset:numeric, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'NUMERIC',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[0-9]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })


        it('nanoid, charset:lowercase, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'LOWERCASE',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[a-z]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:uppercase, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'UPPERCASE',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[A-Z]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:alphanumeric, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'ALPHANUMERIC',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[0-9a-zA-Z]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:without lookalikes, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'NO-LOOKALIKES',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:without lookalikes-safe, charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'NO-LOOKALIKES-SAFE',
                    charlen: 16,
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })

        it('nanoid, charset:custom(hex), charalen:16 ', function(done) {
            var flow = [{
                    id: 'n1',
                    type: 'friendly-id',
                    mode: 'GENERATE-NANOID',
                    charset: 'CUSTOM',
                    charlen: 16,
                    customs: "0123456789abcdef",
                    wires: [
                        ['nh']
                    ]
                },
                {
                    id: 'nh',
                    type: 'helper'
                }
            ]

            helper.load(friendlyIdNode, flow, function() {
                var n1 = helper.getNode('n1')
                var nh = helper.getNode('nh')
                nh.on('input', function(msg) {
                    try {
                        msg.should.have.property('payload').match(/^[0-9a-f]+$/)
                        msg.should.have.property('payload').lengthOf(16)
                        done()
                    } catch (err) {
                        done(err)
                    }
                })
                n1.receive({ payload: '' })
            })
        })
    });


})


// it('should be displayed in same status as output, i:auto, o:auto, s:auto', function(done) {
//     const flow = [{
//             id: 'n1',
//             type: 'friendly-id',
//             mode: 'ENCODE',
//             tostatus: true,
//             statusType: 'auto'
//         },
//         {
//             id: 'ns',
//             type: 'status',
//             scope: ['n1'],
//             wires: [
//                 ['nh']
//             ]
//         },
//         {
//             id: 'nh',
//             type: 'helper'
//         }
//     ]
//     helper.load(friendlyIdNode, flow, function() {
//         const n1 = helper.getNode('n1')
//         const nh = helper.getNode('nh')
//         nh.on('input', function(msg) {
//             try {
//                 msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
//                 done()
//             } catch (err) {
//                 done(err)
//             }
//         })
//         n1.receive({ payload: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
//     })
// })

// it('should be displayed in same status as output, i:auto, o:msg, s:auto', function(done) {
//     const flow = [{
//             id: 'n1',
//             type: 'friendly-id',
//             mode: 'ENCODE',
//             outputToType: "msg",
//             outputToVal: "other",
//             tostatus: true,
//             statusType: 'auto'
//         },
//         {
//             id: 'ns',
//             type: 'status',
//             scope: ['n1'],
//             wires: [
//                 ['nh']
//             ]
//         },
//         {
//             id: 'nh',
//             type: 'helper'
//         }
//     ]
//     helper.load(friendlyIdNode, flow, function() {
//         const n1 = helper.getNode('n1')
//         const nh = helper.getNode('nh')
//         nh.on('input', function(msg) {
//             try {
//                 msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
//                 done()
//             } catch (err) {
//                 done(err)
//             }
//         })
//         n1.receive({ payload: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
//     })
// })


// it('should be displayed in same status as output, i:auto, o:inplace, s:auto', function(done) {
//     const flow = [{
//             id: 'n1',
//             type: 'friendly-id',
//             mode: 'ENCODE',
//             outputToType: "inplace",
//             tostatus: true,
//             statusType: 'auto'
//         },
//         {
//             id: 'ns',
//             type: 'status',
//             scope: ['n1'],
//             wires: [
//                 ['nh']
//             ]
//         },
//         {
//             id: 'nh',
//             type: 'helper'
//         }
//     ]
//     helper.load(friendlyIdNode, flow, function() {
//         const n1 = helper.getNode('n1')
//         const nh = helper.getNode('nh')
//         nh.on('input', function(msg) {
//             try {
//                 msg.status.should.have.property('text', 'mhvXdrZT4jP5T8vBxuvm75')
//                 done()
//             } catch (err) {
//                 done(err)
//             }
//         })
//         n1.receive({ payload: 'a44521d0-0fb8-4ade-8002-3385545c3318' })
//     })
// })




// describe('friendly-id Node', function() {

//     it('should be converted to a shoutid', function(done) {
//         var flow = [{
//                 id: 'n1',
//                 type: 'friendly-id',
//                 mode: 'ENCODE',
//                 wires: [
//                     ['nh']
//                 ]
//             },
//             {
//                 id: 'nh',
//                 type: 'helper'
//             }
//         ];

//         helper.load(friendlyIdNode, flow, function() {
//             var n1 = helper.getNode('n1');
//             var nh = helper.getNode('nh');
//             nh.on('input', function(msg) {
//                 try {
//                     msg.should.have.property('payload', 'mhvXdrZT4jP5T8vBxuvm75');
//                     done();
//                 } catch (err) {
//                     done(err);
//                 }
//             });
//             n1.receive({ payload: 'a44521d0-0fb8-4ade-8002-3385545c3318' });
//         });
//     });

//     it('should be converted to a UUID', function(done) {
//         var flow = [{
//                 id: 'n1',
//                 type: 'friendly-id',
//                 mode: 'DECODE',
//                 wires: [
//                     ['nh']
//                 ]
//             },
//             {
//                 id: 'nh',
//                 type: 'helper'
//             }
//         ];

//         helper.load(friendlyIdNode, flow, function() {
//             var n1 = helper.getNode('n1');
//             var nh = helper.getNode('nh');
//             nh.on('input', function(msg) {
//                 try {
//                     msg.should.have.property('payload', 'a44521d0-0fb8-4ade-8002-3385545c3318');
//                     done();
//                 } catch (err) {
//                     done(err);
//                 }
//             });
//             n1.receive({ payload: 'mhvXdrZT4jP5T8vBxuvm75' });
//         });
//     });

//     it('should generate a random uuid4', function(done) {
//         var flow = [{
//                 'id': 'n1',
//                 'type': 'friendly-id',
//                 'mode': 'GENERATE-UUID4',
//                 'wires': [
//                     ['nh']
//                 ]
//             },
//             {
//                 id: 'nh',
//                 type: 'helper'
//             }
//         ];

//         helper.load(friendlyIdNode, flow, function() {
//             var n1 = helper.getNode('n1');
//             var nh = helper.getNode('nh');
//             nh.on('input', function(msg) {
//                 try {
//                     msg.should.have.ownProperty('payload');
//                     msg.payload.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
//                     done();
//                 } catch (err) {
//                     done(err);
//                 }
//             });
//             n1.receive({ payload: '' });
//         });
//     });
// });