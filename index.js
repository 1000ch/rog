'use strict';

const got = require('got');
const isHTML = require('is-html');
const cheerio = require('cheerio');

module.exports = (url, options) => {

  return got(url, options).then(response => {

    if (!isHTML(response.body)) {
      return Promise.reject('Response is not HTML');
    }

    let $ = cheerio.load(response.body);

    let title = $('meta[property="og:title"]').attr('content') ||
                $('meta[name="twitter:title"]').attr('content') ||
                $('meta[name="title"]').attr('content');

    let type = $('meta[property="og:type"]').attr('content');

    let url = $('meta[property="og:url"]').attr('content') ||
              $('meta[name="twitter:url"]').attr('content') ||
              $('link[rel="canonical"]').attr('href');

    let image = $('meta[property="og:image"]').attr('content') ||
                $('meta[name="twitter:image"]').attr('content');

    let site = $('meta[property="og:site_name"]').attr('content') ||
               $('meta[name="twitter:site"]').attr('content');

    let description = $('meta[property="og:description"]').attr('content') ||
                      $('meta[name="twitter:description"]').attr('content') ||
                      $('meta[name="description"]').attr('content');

    let locale = $('meta[property="og:locale"]').attr('content');

    return Promise.resolve({
      title       : title       || '',
      type        : type        || '',
      url         : url         || '',
      image       : image       || '',
      site        : title       || '',
      description : description || '',
      locale      : locale      || ''
    });
  });
};
