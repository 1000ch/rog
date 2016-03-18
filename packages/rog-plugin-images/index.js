'use strict';

const URL = require('url');
const isRelative = require('is-relative');

module.exports = function($, url) {
  let urls = [];
  $('img').each((index, img) => {
    urls.push(URL.resolve(url, $(img).attr('src')));
  });
  return urls;
};
