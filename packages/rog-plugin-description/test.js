const test = require('ava');
const rog = require('rog');

test('retrieve description', async t => {
  const data = await rog('https://google.co.jp/', null, {
    description: require('.')
  });

  t.plan(1);
  t.not(data.description, undefined, 'description is not undefined');
});
