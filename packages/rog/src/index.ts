import got, {Response} from 'got';
import isURL from 'is-url';
import isBinaryPath from 'is-binary-path';
import isHTML from 'is-html';
import cheerio from 'cheerio';
import {detect} from 'jschardet';
import {decode} from 'iconv-lite';

export type RogResponse = Record<string, string | string[]>;
export type RogPlugin = ($: cheerio.Root, url: string) => RogPluginResponse;
export type RogPluginResponse = string | string[] | null;

function getBody(response: Response<Buffer>): string {
  const {body, headers} = response;
  const hasCharset = new RegExp(/charset=(?<charset>.+)/);
  const matches = hasCharset.exec(headers['content-type'] ?? '');
  if (matches !== null) {
    return decode(body, matches[1]);
  }

  const result = detect(body);
  if (result.encoding && (result.confidence || 0) >= 0.99) {
    return decode(body, result.encoding);
  }

  const hasHead = new RegExp(/<head[\s>](?<head>[\s\S]*?)<\/head>/i);
  const head = hasHead.exec(body.toString('ascii'));
  if (!head) {
    return body.toString('utf8');
  }

  const hasMetaCharset = new RegExp(/<meta[^>]*[\s;]+charset\s*=\s*["']?(?<charset>[\w\-_]+)["']?/i);
  const charset = hasMetaCharset.exec(head[1]);
  if (charset) {
    return decode(body, charset[1].trim());
  }

  return body.toString('utf8');
}

export const rog = async (url: string, parsers: Record<string, RogPlugin>): Promise<RogResponse> => {
  if (!isURL(url)) {
    throw new Error(`URL is invalid: ${url}`);
  }

  if (isBinaryPath(url)) {
    throw new Error(`Binary is not supported: ${url}`);
  }

  const response = await got(url, {
    encoding: undefined,
    timeout: 2000,
    responseType: 'buffer'
  });
  const body = getBody(response);

  if (!isHTML(body)) {
    throw new Error('Response is not HTML');
  }

  const $ = cheerio.load(body);
  const data: RogResponse = {};
  for (const [key, parse] of Object.entries(parsers)) {
    data[key] = parse($, url) ?? '';
  }

  return data;
};
