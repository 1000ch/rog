import test from 'ava';
import rog from 'rog';

test('retrieve description', async t => {
  const data = await rog('https://google.co.jp/', null, {
    description: require('.')
  });

  t.plan(1);
  t.not(data.description, undefined, 'description is not undefined');
});