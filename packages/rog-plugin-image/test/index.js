const test = require('ava');
const rog = require('rog');

test('retrieve image', async t => {
  const data = await rog('https://google.co.jp/', null, {
    image: require('..')
  });

  t.plan(1);
  t.not(data.image, undefined, 'image is not undefined');
});
