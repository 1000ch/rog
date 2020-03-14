import test from 'ava';
import rog from 'rog';

test('retrieve images', async t => {
  const data = await rog('https://google.co.jp/', null, {
    images: require('.')
  });

  t.plan(1);
  t.not(data.images, undefined, 'images is not undefined');
});
