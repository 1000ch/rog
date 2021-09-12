import test from 'ava';
import {rog} from 'rog';
import {rogDescription} from '../dist/index.js';

test('retrieve description', async t => {
  const data = await rog('https://google.co.jp/', {
    description: rogDescription,
  });

  t.plan(1);
  t.not(data.description, undefined, 'description is not undefined');
});
