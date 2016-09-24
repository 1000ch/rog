'use strict';

const URL = require('url');
const isURL = require('is-url');

module.exports = function ($, url) {
  let urls = [];
  $('img').each((index, img) => {
    let src = $(img).attr('src');
    if (isURL(src)) {
      urls.push(src);
    } else if (src && src.startsWith('data:')) {
      urls.push(src);
    } else if (src) {
      urls.push(URL.resolve(url, src));
    }
  });
  return urls;
};
