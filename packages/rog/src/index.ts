import got, { Response } from 'got';
import isURL from 'is-url';
import isBinaryPath from 'is-binary-path';
import isHTML from 'is-html';
import { load } from 'cheerio';
import { detect } from 'jschardet';
import { decode } from 'iconv-lite';

export type RogResponse = Record<string, string | string[]>;
export type RogPlugin = ($: CheerioStatic, url: string) => RogPluginResponse;
export type RogPluginResponse = string | string[] | null;

function getBody(response: Response<Buffer>): string {
  const { body, headers } = response;
  const contentType = headers['content-type'] || '';
  const matches = contentType.match(/charset=(?<charset>.+)/);
  if (matches !== null) {
    return decode(body, matches[1]);
  }

  const result = detect(body);
  if (result && result.encoding && (result.confidence || 0) >= 0.99) {
    return decode(body, result.encoding);
  }

  const head = body.toString('ascii').match(/<head[\s>](?<head>[\s\S]*?)<\/head>/i);
  if (!head) {
    return body.toString('utf8');
  }

  const charset = head[1].match(/<meta[^>]*[\s;]+charset\s*=\s*["']?(?<charset>[\w\-_]+)["']?/i);
  if (charset) {
    return decode(body, charset[1].trim());
  }

  return body.toString('utf8');
}

async function rog(url: string, parsers: Record<string, RogPlugin>): Promise<RogResponse> {
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

  const $: CheerioStatic = load(body);
  const data: RogResponse = {};
  for (const [key, parse] of Object.entries(parsers)) {
    data[key] = parse($, url) || '';
  }

  return data;
}

export default rog;
