import {RogPlugin, RogPluginResponse} from 'rog';

export const rogDescription: RogPlugin = ($: CheerioStatic): RogPluginResponse => {
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
