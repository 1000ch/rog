import { RogPlugin, RogPluginResponse } from 'rog';
import isURL from 'is-url';

const plugin: RogPlugin = function($, url): RogPluginResponse {
  const urls: string[] = [];

  $('img').each((index, img) => {
    const src = $(img).attr('src');

    if (src && isURL(src)) {
      urls.push(src);
    } else if (src && src.startsWith('data:')) {
      urls.push(src);
    } else if (src) {
      urls.push(new URL(src, url).toString());
    }
  });

  return urls;
};

export default plugin;
