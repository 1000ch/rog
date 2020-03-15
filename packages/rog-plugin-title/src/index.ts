import { RogPlugin, RogPluginResponse } from 'rog';

const plugin: RogPlugin = function($): RogPluginResponse {
  const records: Record<string, string> = {
    'meta[property="og:title"]': 'content',
    'meta[name="twitter:title"]': 'content',
    'meta[name="title"]': 'content'
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
