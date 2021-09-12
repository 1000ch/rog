import type {RogPlugin, RogPluginResponse} from 'rog';

export const rogSitename: RogPlugin = ($: cheerio.Root): RogPluginResponse => {
  const records: Record<string, string> = {
    'meta[property="og:site_name"]': 'content',
    'meta[name="twitter:site"]': 'content',
  };

  for (const [query, attr] of Object.entries(records)) {
    const value = $(query).attr(attr);

    if (value) {
      return value;
    }
  }

  return null;
};
