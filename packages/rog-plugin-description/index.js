'use strict';

module.exports = function ($) {
  return $('meta[property="og:description"]').attr('content') ||
         $('meta[name="twitter:description"]').attr('content') ||
         $('meta[name="description"]').attr('content');
};
