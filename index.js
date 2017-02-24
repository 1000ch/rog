'use strict';

const got = require('got');
const isURL = require('is-url');
const isHTML = require('is-html');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

const getBody = response => {
  const header = response.header || {};
  const body = response.body;

  const contentType = header['content-type'] || '';
  const matches = contentType.match(/charset=(.+)/);
  if (matches !== null) {
    return body.toString(matches[1]);
  }

  const result = jschardet.detect(body);
  if (result && result.encoding && (result.confidence || 0) >= 0.99) {
    return iconv.decode(body, result.encoding);
  }

  const head = body.toString('ascii').match(/<head[\s>]([\s\S]*?)<\/head>/i);
  if (!head) {
    return body.toString('utf8');
  }

  const charset = head[1].match(/<meta[^>]*[\s;]+charset\s*=\s*["']?([\w\-_]+)["']?/i);
  if (charset) {
    return iconv.decode(response.body, charset[1].trim());
  }

  return response.body.toString('utf8');
};

module.exports = (url, options, parsers) => {
  if (!isURL(url)) {
    return Promise.reject(`URL is invalid: ${url}`);
  }

  options = options || {};
  options.encoding = null;
  options.timeout = 2000;
  parsers = parsers || {};

  return got(url, options).then(response => {
    const body = getBody(response);

    if (!isHTML(body)) {
      return Promise.reject('Response is not HTML');
    }

    const $ = cheerio.load(body);
    let data = {};
    for (let key of Object.keys(parsers)) {
      data[key] = parsers[key]($, url) || '';
    }

    return Promise.resolve(data);
  });
};
