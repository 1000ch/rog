const test = require('ava');
const rog = require('.');

test('retrieve type', async t => {
  const data = await rog('https://google.co.jp/', null, {
    type: require('.')
  });

  t.plan(1);
  t.not(data.type, undefined, 'type is not undefined');
});
