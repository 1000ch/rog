'use strict';

module.exports = function($) {
  return $('meta[property="og:image"]').attr('content') ||
         $('meta[name="twitter:image"]').attr('content') ||
         $('meta[name="twitter:image:src"]').attr('content');
};
