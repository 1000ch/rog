'use strict';

module.exports = function($) {
  return $('meta[property="og:url"]').attr('content') ||
         $('meta[name="twitter:url"]').attr('content') ||
         $('link[rel="canonical"]').attr('href');
};
