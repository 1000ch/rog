import {RogPlugin, RogPluginResponse} from 'rog';

export const rogImage: RogPlugin = ($: CheerioStatic): RogPluginResponse => {
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
