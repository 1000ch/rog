const test = require('ava');
const rog = require('rog');

test('retrieve url', async t => {
  const data = await rog('https://google.co.jp/', null, {
    url: require('..')
  });

  t.plan(1);
  t.not(data.url, undefined, 'url is not undefined');
});
