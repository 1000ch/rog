'use strict';

module.exports = $ =>
  $('meta[property="og:site_name"]').attr('content') ||
  $('meta[name="twitter:site"]').attr('content');
