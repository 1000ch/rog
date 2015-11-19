# rog

Retrieve open graph data from passing URL.

## Installation

```bash
$ npm i rog
```

## Usage

```javascript
const rog = require('rog');

rog('http://google.com').then(data => {
  console.log(data.title);       // => <meta property="og:title" content="...">
  console.log(data.type);        // => <meta property="og:type" content="...">
  console.log(data.url);         // => <meta property="og:url" content="...">
  console.log(data.image);       // => <meta property="og:image" content="...">
  console.log(data.site);        // => <meta property="og:site" content="...">
  console.log(data.description); // => <meta property="og:description" content="...">
  console.log(data.locale);      // => <meta property="og:locale" content="...">
}).catch(error => {
  console.error(error);
});
```

It will retrieve alternative data if `<meta property="og:...">` does not exist. For example, if `<meta property="og:url" content="...">` does not exist, it will retrieve `<meta name="twitter:url">` or `<link rel="canonical">`.

## License

MIT: http://1000ch.mit-license.org
