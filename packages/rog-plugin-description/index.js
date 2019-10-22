'use strict';

module.exports = $ =>
  $('meta[property="og:description"]').attr('content') ||
  $('meta[name="twitter:description"]').attr('content') ||
  $('meta[name="description"]').attr('content');
