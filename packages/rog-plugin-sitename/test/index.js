const test = require('ava');
const {rog} = require('rog');
const {rogSitename} = require('..');

test('retrieve sitename', async t => {
  const data = await rog('https://google.co.jp/', {
    sitename: rogSitename
  });

  t.plan(1);
  t.not(data.sitename, undefined, 'sitename is not undefined');
});
