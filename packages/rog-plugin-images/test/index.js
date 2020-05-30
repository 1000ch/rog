const test = require('ava');
const {rog} = require('rog');
const {rogImages} = require('..');

test('retrieve images', async t => {
  const data = await rog('https://google.co.jp/', {
    images: rogImages
  });

  t.plan(1);
  t.not(data.images, undefined, 'images is not undefined');
});
