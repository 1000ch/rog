import {RogPlugin, RogPluginResponse} from 'rog';

export const rogType: RogPlugin = ($: CheerioStatic): RogPluginResponse => {
  const records: Record<string, string> = {
    'meta[property="og:type"]': 'content'
  };

  for (const [query, attr] of Object.entries(records)) {
    const value = $(query).attr(attr);

    if (value) {
      return value;
    }
  }

  return null;
};
