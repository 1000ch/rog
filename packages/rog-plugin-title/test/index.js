import test from 'ava';
import {rog} from 'rog';
import {rogTitle} from '../dist/index.js';

test('retrieve title', async t => {
  const data = await rog('https://google.co.jp/', {
    title: rogTitle,
  });

  t.plan(1);
  t.not(data.title, undefined, 'title is not undefined');
});
