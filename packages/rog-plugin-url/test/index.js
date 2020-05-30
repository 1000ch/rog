const test = require('ava');
const {rog} = require('rog');
const {rogUrl} = require('..');

test('retrieve url', async t => {
  const data = await rog('https://google.co.jp/', {
    url: rogUrl
  });

  t.plan(1);
  t.not(data.url, undefined, 'url is not undefined');
});
