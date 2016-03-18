# rog [![Build Status](https://travis-ci.org/1000ch/rog.svg?branch=master)](https://travis-ci.org/1000ch/rog) [![Dependency Status](https://david-dm.org/1000ch/rog.svg)](https://david-dm.org/1000ch/rog)

Retrieve open graph data from passing URL.

## Installation

```bash
$ npm i rog
```

## Usage

```javascript
const rog = require('rog');

rog('http://google.com', {}, {
  title: require('rog-plugin-title')
}).then(data => {
  console.log(data.title);       // => <meta property="og:title" content="...">
}).catch(error => {
  console.error(error);
});
```

## License

MIT: http://1000ch.mit-license.org
