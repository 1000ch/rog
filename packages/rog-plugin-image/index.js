'use strict';

module.exports = $ =>
  $('meta[property="og:image"]').attr('content') ||
  $('meta[name="twitter:image"]').attr('content') ||
  $('meta[name="twitter:image:src"]').attr('content');
