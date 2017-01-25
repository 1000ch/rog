'use strict';

const got = require('got');
const isURL = require('is-url');
const isHTML = require('is-html');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

module.exports = (url, options, parsers) => {
  if (!isURL(url)) {
    return Promise.reject(`URL is invalid: ${url}`);
  }

  options = options || {};
  options.encoding = null;
  options.timeout = 2000;
  parsers = parsers || {};

  return got(url, options).then(response => {
    let result = jschardet.detect(response.body);
    let body;
    if (!result || !result.encoding || (result.confidence || 0) < 0.99) {
      let head = response.body.toString('ascii').match(/<head[\s>]([\s\S]*?)<\/head>/i);
      if (head) {
        let charset = head[1].match(/<meta[^>]*[\s;]+charset\s*=\s*["']?([\w\-_]+)["']?/i);
        if (charset) {
          body = iconv.decode(response.body, charset[1].trim());
        } else {
          body = response.body.toString('utf8');
        }
      } else {
        body = response.body.toString('utf8');
      }
    } else {
      body = iconv.decode(response.body, result.encoding);
    }

    if (!isHTML(body)) {
      return Promise.reject('Response is not HTML');
    }

    let $ = cheerio.load(body);

    let data = {};
    let keys = Object.keys(parsers);

    for (let key of keys) {
      data[key] = parsers[key]($, url) || '';
    }

    return Promise.resolve(data);
  });
};
