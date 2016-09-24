'use strict';

module.exports = function ($) {
  return $('meta[property="og:type"]').attr('content');
};
