'use strict';

module.exports = function ($) {
  return $('meta[property="og:title"]').attr('content') ||
         $('meta[name="twitter:title"]').attr('content') ||
         $('meta[name="title"]').attr('content');
};
