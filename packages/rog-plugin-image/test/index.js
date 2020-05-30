const test = require('ava');
const {rog} = require('rog');
const {rogImage} = require('..');

test('retrieve image', async t => {
  const data = await rog('https://google.co.jp/', {
    image: rogImage
  });

  t.plan(1);
  t.not(data.image, undefined, 'image is not undefined');
});
