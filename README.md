[![platform](https://img.shields.io/badge/platform-Node--RED-brown.svg)](https://nodered.org/) [![Release Ver](https://img.shields.io/npm/v/node-red-contrib-friendly-id?color=limegreen&label=release)](https://flows.nodered.org/node/node-red-contrib-friendly-id) [![install size](https://packagephobia.com/badge?p=node-red-contrib-friendly-id)](https://packagephobia.com/result?p=node-red-contrib-friendly-id) [![downloads](https://img.shields.io/npm/dm/node-red-contrib-friendly-id.svg)](https://www.npmjs.com/package/node-red-contrib-friendly-id) ![npm version](https://img.shields.io/badge/npm-6.9.0-blue.svg) [![License](https://img.shields.io/github/license/eternity1984/node-red-contrib-friendly-id)](License) [![dependencies Status](https://status.david-dm.org/gh/eternity1984/node-red-contrib-friendly-id.svg)](https://david-dm.org/eternity1984/node-red-contrib-friendly-id) [![Total alerts](https://img.shields.io/lgtm/alerts/g/eternity1984/node-red-contrib-friendly-id.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/eternity1984/node-red-contrib-friendly-id/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/eternity1984/node-red-contrib-friendly-id.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/eternity1984/node-red-contrib-friendly-id/context:javascript) ...




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

## Acknowledgements
This project uses the following open source software:
- [short-uuid](https://www.npmjs.com/package/short-uuid) - [MIT License](https://github.com/oculus42/short-uuid/blob/develop/LICENSE)
- [nanoid](https://www.npmjs.com/package/nanoid) - [MIT License](https://github.com/ai/nanoid/blob/main/LICENSE)
- [nanoid-dictionary](https://www.npmjs.com/package/nanoid-dictionary) - [MIT License](https://github.com/CyberAP/nanoid-dictionary/blob/master/LICENSE)

## License
This project is released under the [MIT License](LICENSE).