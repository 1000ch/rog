# rog

Retrieve open graph data by passing URL.

[![Build Status](https://travis-ci.org/1000ch/rog.svg?branch=master)](https://travis-ci.org/1000ch/rog)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Install

Install `rog` and its plugins.

```bash
$ npm install rog
$ npm install rog-plugin-title
```

## Usage

```javascript
const rog = require('rog');

rog('http://google.com', {}, {
  title: require('rog-plugin-title')
}).then(data => {
  console.log(data.title); // => <meta property="og:title" content="...">
}).catch(error => {
  console.error(error);
});
```

## Plugins

- [`rog-plugin-description`](packages/rog-plugin-description): a plugin to analyze `<meta property="og:description">` and others.
- [`rog-plugin-image`](packages/rog-plugin-image): a plugin to analyze `<meta property="og:image">` and others.
- [`rog-plugin-images`](packages/rog-plugin-images): a plugin to analyze `<img>`s written in `<body>`.
- [`rog-plugin-locale`](packages/rog-plugin-locale): a plugin to analyze `<meta property="og:locale">`.
- [`rog-plugin-sitename`](packages/rog-plugin-sitename): a plugin to analyze `<meta property="og:site_name">` and others.
- [`rog-plugin-title`](packages/rog-plugin-title): a plugin to analyze `<meta property="og:title">` and others.
- [`rog-plugin-type`](packages/rog-plugin-type): a plugin to analyze `<meta property="og:type">`.
- [`rog-plugin-url`](packages/rog-plugin-url): a plugin to analyze `<meta property="og:url">` and others.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
