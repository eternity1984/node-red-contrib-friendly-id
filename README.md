<p align="center">
    <a href="https://nodered.org/"><img src="https://img.shields.io/badge/Platform-Node--RED-brown.svg" alt="Platform"></a>
    <a href="https://flows.nodered.org/node/node-red-contrib-friendly-id"><img src="https://img.shields.io/npm/v/node-red-contrib-friendly-id/latest?color=brightgreen&label=ver@latest" alt="npm@latest"></a>
    <img src="https://img.shields.io/badge/npm-6.9.0-blue.svg" alt="npm"><br />
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/node-red-contrib-friendly-id" alt="License: MIT"></a>
    <a href="#"><img src="https://img.shields.io/snyk/vulnerabilities/npm/node-red-contrib-friendly-id" alt="vulnerabilities"></a>    
</p>

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