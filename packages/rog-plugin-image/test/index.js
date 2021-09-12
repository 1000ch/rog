import test from 'ava';
import {rog} from 'rog';
import {rogImage} from '../dist/index.js';

test('retrieve image', async t => {
  const data = await rog('https://google.co.jp/', {
    image: rogImage,
  });

  t.plan(1);
  t.not(data.image, undefined, 'image is not undefined');
});
