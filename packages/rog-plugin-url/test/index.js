import test from 'ava';
import {rog} from 'rog';
import {rogUrl} from '../dist/index.js';

test('retrieve url', async t => {
  const data = await rog('https://google.co.jp/', {
    url: rogUrl,
  });

  t.plan(1);
  t.not(data.url, undefined, 'url is not undefined');
});
