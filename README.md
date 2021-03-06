[![platform][img-platform]][url-nodered]
[![npm version][img-npm-version]][url-my-flow]
[![install size][img-install-size]][url-packagephobia]
[![downloads][img-downloads-current]][url-npm-package]
[![downloads][img-downloads-total]][url-npm-package]
[![License][img-license]](License)
[![JavaScript Style Guide][img-standard]][url-standard]
[![circle-ci][img-circleci]][url-circleci]
[![dependencies Status][img-depends-status]][url-david-dm]
[![Total alerts][img-lgtm-alerts]][url-lgtm]
[![Language grade: JavaScript][img-lgtm-lang-grade]][url-lgtm]
[![Maintainability][img-codeclimate-m]][url-codeclimate]
[![Maintainability][img-codeclimate-t]][url-codeclimate]
...



# node-red-contrib-friendly-id
A node for [Node-RED](http://www.nodered.org/) that converts a given UUID to a URL-friendly ID(short-uuid). You can also generate secure ID using [nanoid](https://github.com/ai/nanoid) and [short-uuid](https://github.com/oculus42/short-uuid).

## Installation
Run the following command in the root directory of your Node-RED install:
```shell
$ npm install node-red-contrib-friendly-id
```

## Usage

### from UUID / to UUID
![encode-decode](.images/encode-decode.gif)

### Generate Friendly ID
![generate](.images/generate-id.gif)


## v0.2.x migration [example flows]
In version `0.1.x`, the node was depend on a `payload` property (`msg.payload`).  
In version `0.2.x`, Input / output can be specified, preventing node wiring from becoming complicated.


**Okay, so let's walk through some use case scenarios...**

> **Case 1:**  
> How do I set a generated `short-uuid` to `msg.myid` property while preserving the original `msg.payload` property?

![How?](.images/timestamp-shortuuid-how.png)

The expected values of each property are as follows:

```js
{
    _msgid: "********.*****",
    payload: 1612274237107,
    myid: "wGAYZWkGersMXj5KzA2vDU"
}
```

**v0.1.x:**

![v0.1.x](.images/timestamp-shortuuid-v0.1.x.png)


**v0.2.x (migration)**

![v0.2.x](.images/timestamp-shortuuid-v0.2.x.png)

```json
[{"id":"a88c20f.676d3e","type":"debug","z":"f6f2187d.f17ca8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":450,"y":340,"wires":[]},{"id":"c04fc85.e6ef838","type":"friendly-id","z":"f6f2187d.f17ca8","name":"","mode":"GENERATE-SHORTID","charlen":21,"charset":"DEFAULT","customs":"","tostatus":false,"statusVal":"","statusType":"auto","inputFromVal":"","inputFromType":"auto","outputToVal":"myid","outputToType":"msg","x":300,"y":340,"wires":[["a88c20f.676d3e"]]},{"id":"68101c27.6c4f84","type":"inject","z":"f6f2187d.f17ca8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":140,"y":340,"wires":[["c04fc85.e6ef838"]]}]
```


> **Case 2:**  
> How do I directly overwrite the converted UUID to a property used for input?

![how?](.images/changes-param-directly-how.png)


**v0.1.x:**

![v0.1.x](.images/changes-param-directly-v0.1.x.png)

**v0.2.x (migration)**

![v0.2.x](.images/changes-param-directly-v0.2.x.png)

```json
[{"id":"130a8293.06421d","type":"http response","z":"f6f2187d.f17ca8","name":"","statusCode":"","headers":{},"x":510,"y":380,"wires":[]},{"id":"283657c9.5e37d8","type":"friendly-id","z":"f6f2187d.f17ca8","name":"","mode":"DECODE","charlen":21,"charset":"DEFAULT","customs":"","tostatus":false,"statusVal":"","statusType":"auto","inputFromVal":"req.params.userid","inputFromType":"msg","outputToVal":"req.params.userid","outputToType":"msg","x":360,"y":380,"wires":[["19a63487.dc85bb","130a8293.06421d"]]},{"id":"92bdbc63.ac83f","type":"http in","z":"f6f2187d.f17ca8","name":"","url":"/api/v2/users/:userid","method":"get","upload":false,"swaggerDoc":"","x":150,"y":380,"wires":[["283657c9.5e37d8"]]},{"id":"19a63487.dc85bb","type":"debug","z":"f6f2187d.f17ca8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"req.params.userid","targetType":"msg","statusVal":"","statusType":"auto","x":560,"y":340,"wires":[]}]
```


## Acknowledgements
This project uses the following open source software:
- [short-uuid](https://www.npmjs.com/package/short-uuid) - [MIT License](https://github.com/oculus42/short-uuid/blob/develop/LICENSE)
- [nanoid](https://www.npmjs.com/package/nanoid) - [MIT License](https://github.com/ai/nanoid/blob/main/LICENSE)
- [nanoid-dictionary](https://www.npmjs.com/package/nanoid-dictionary) - [MIT License](https://github.com/CyberAP/nanoid-dictionary/blob/master/LICENSE)

## License
This project is released under the [MIT License](LICENSE).


[img-platform]: https://img.shields.io/badge/platform-Node--RED-brown.svg
[img-install-size]: https://packagephobia.com/badge?p=node-red-contrib-friendly-id
[img-downloads-current]: https://img.shields.io/npm/dm/node-red-contrib-friendly-id.svg
[img-downloads-total]: https://img.shields.io/npm/dt/node-red-contrib-friendly-id.svg
[img-npm-version]: https://img.shields.io/npm/v/node-red-contrib-friendly-id
[img-license]: https://img.shields.io/github/license/eternity1984/node-red-contrib-friendly-id
[img-depends-status]: https://status.david-dm.org/gh/eternity1984/node-red-contrib-friendly-id.svg

[img-lgtm-alerts]: https://img.shields.io/lgtm/alerts/g/eternity1984/node-red-contrib-friendly-id.svg?logo=lgtm&logoWidth=18
[img-lgtm-lang-grade]: https://img.shields.io/lgtm/grade/javascript/g/eternity1984/node-red-contrib-friendly-id.svg?logo=lgtm&logoWidth=18
[img-codeclimate-m]: https://api.codeclimate.com/v1/badges/40c8fc69eb0934cf5e8f/maintainability
[img-codeclimate-t]: https://api.codeclimate.com/v1/badges/40c8fc69eb0934cf5e8f/test_coverage
[url-codeclimate]: https://codeclimate.com/github/eternity1984/node-red-contrib-friendly-id/

[img-standard]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[url-standard]: https://standardjs.com

[url-nodered]: https://nodered.org/
[url-my-flow]: https://flows.nodered.org/node/node-red-contrib-friendly-id
[url-packagephobia]: https://packagephobia.com/result?p=node-red-contrib-friendly-id
[url-npm-package]: https://www.npmjs.com/package/node-red-contrib-friendly-id
[url-david-dm]: https://david-dm.org/eternity1984/node-red-contrib-friendly-id
[url-lgtm]: https://lgtm.com/projects/g/eternity1984/node-red-contrib-friendly-id/

[img-circleci]: https://circleci.com/gh/eternity1984/node-red-contrib-friendly-id.svg?style=shield
[url-circleci]: https://app.circleci.com/pipelines/github/eternity1984/node-red-contrib-friendly-id