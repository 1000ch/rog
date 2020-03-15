import { RogPlugin, RogPluginResponse } from 'rog';

const plugin: RogPlugin = function($: CheerioStatic, url: string): RogPluginResponse {
  const records: Record<string, string> = {
    'meta[property="og:description"]': 'content',
    'meta[name="twitter:description"]': 'content',
    'meta[name="description"]': 'content'
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
