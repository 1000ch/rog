import test from 'ava';
import {rog} from 'rog';
import {rogLocale} from '../dist/index.js';

test('retrieve locale', async t => {
  const data = await rog('https://google.co.jp/', {
    locale: rogLocale
  });

  t.plan(1);
  t.not(data.locale, undefined, 'locale is not undefined');
});
