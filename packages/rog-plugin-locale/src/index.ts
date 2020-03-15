import { RogPlugin, RogPluginResponse } from 'rog';

const plugin: RogPlugin = function($): RogPluginResponse {
  const records: Record<string, string> = {
    'meta[property="og:locale"]': 'content'
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
