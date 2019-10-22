'use strict';

const got = require('got');
const isURL = require('is-url');
const binaryExtensions = require('binary-extensions');
const isHTML = require('is-html');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

const binaries = new RegExp(`(${binaryExtensions.map(ext => `.${ext}`).join('|')})$`);

const getBody = response => {
  const headers = response.headers || {};
  const body = response.body || '';

  const contentType = headers['content-type'] || '';
  const matches = contentType.match(/charset=(?<charset>.+)/);
  if (matches !== null) {
    return iconv.decode(body, matches[1]);
  }

  const result = jschardet.detect(body);
  if (result && result.encoding && (result.confidence || 0) >= 0.99) {
    return iconv.decode(body, result.encoding);
  }

  const head = body.toString('ascii').match(/<head[\s>](?<head>[\s\S]*?)<\/head>/i);
  if (!head) {
    return body.toString('utf8');
  }

  const charset = head[1].match(/<meta[^>]*[\s;]+charset\s*=\s*["']?(?<charset>[\w\-_]+)["']?/i);
  if (charset) {
    return iconv.decode(body, charset[1].trim());
  }

  return body.toString('utf8');
};

const normalize = options => {
  options = options || {};
  options.encoding = null;
  options.timeout = 2000;
  return options;
};

module.exports = async (url, options, parsers = {}) => {
  if (!isURL(url)) {
    throw new Error(`URL is invalid: ${url}`);
  }

  if (url.match(binaries)) {
    throw new Error(`Binary is not supported: ${url}`);
  }

  const response = await got(url, normalize(options));
  const body = getBody(response);

  if (!isHTML(body)) {
    throw new Error('Response is not HTML');
  }

  const $ = cheerio.load(body);
  const data = {};
  for (const key of Object.keys(parsers)) {
    data[key] = parsers[key]($, url) || '';
  }

  return data;
};
