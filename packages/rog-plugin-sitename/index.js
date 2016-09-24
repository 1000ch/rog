'use strict';

module.exports = function ($) {
  return $('meta[property="og:site_name"]').attr('content') ||
         $('meta[name="twitter:site"]').attr('content');
};
