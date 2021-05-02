import test from 'ava';
import {rog} from 'rog';
import {rogSitename} from '../dist/index.js';

test('retrieve sitename', async t => {
  const data = await rog('https://google.co.jp/', {
    sitename: rogSitename
  });

  t.plan(1);
  t.not(data.sitename, undefined, 'sitename is not undefined');
});
