import test from 'ava';
import {rog} from 'rog';
import {rogImages} from '../dist/index.js';

test('retrieve images', async t => {
  const data = await rog('https://google.co.jp/', {
    images: rogImages
  });

  t.plan(1);
  t.not(data.images, undefined, 'images is not undefined');
});
