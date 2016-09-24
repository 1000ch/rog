'use strict';

module.exports = function ($) {
  return $('meta[property="og:locale"]').attr('content');
};
