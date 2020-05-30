const test = require('ava');
const {rog} = require('rog');
const {rogLocale} = require('..');

test('retrieve locale', async t => {
  const data = await rog('https://google.co.jp/', {
    locale: rogLocale
  });

  t.plan(1);
  t.not(data.locale, undefined, 'locale is not undefined');
});
