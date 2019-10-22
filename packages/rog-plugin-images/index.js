'use strict';

const isURL = require('is-url');

module.exports = function ($, url) {
  const urls = [];
  $('img').each((index, img) => {
    const src = $(img).attr('src');
    if (isURL(src)) {
      urls.push(src);
    } else if (src && src.startsWith('data:')) {
      urls.push(src);
    } else if (src) {
      urls.push(new URL(src, url));
    }
  });
  return urls;
};
