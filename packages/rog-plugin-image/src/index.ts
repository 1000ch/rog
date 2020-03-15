import { RogPlugin, RogPluginResponse } from 'rog';

const plugin: RogPlugin = function($, url): RogPluginResponse {
  const records: Record<string, string> = {
    'meta[property="og:image"]': 'content',
    'meta[name="twitter:image"]': 'content',
    'meta[name="twitter:image:src"]': 'content'
  };

  for (const [query, attr] of Object.entries(records)) {
    const value = $(query).attr(attr);

    if (value) {
      return value;
    }
  }

  return null;
};

export default plugin;
