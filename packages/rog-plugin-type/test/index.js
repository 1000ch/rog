import test from 'ava';
import {rog} from 'rog';
import {rogType} from '../dist/index.js';

test('retrieve type', async t => {
  const data = await rog('https://google.co.jp/', {
    type: rogType
  });

  t.plan(1);
  t.not(data.type, undefined, 'type is not undefined');
});
