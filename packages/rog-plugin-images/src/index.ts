/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import {RogPlugin, RogPluginResponse} from 'rog';
import isURL from 'is-url';

export const rogImages: RogPlugin = ($, url): RogPluginResponse => {
  const urls: string[] = [];

  $('img').each((index, img) => {
    const src = $(img).attr('src');

    if (src && isURL(src)) {
      urls.push(src);
    } else if (src?.startsWith('data:')) {
      urls.push(src);
    } else if (src) {
      urls.push(new URL(src, url).toString());
    }
  });

  return urls;
};
