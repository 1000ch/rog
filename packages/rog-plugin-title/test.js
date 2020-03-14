import test from 'ava';
import rog from 'rog';

test('retrieve title', async t => {
  const data = await rog('https://google.co.jp/', null, {
    title: require('.')
  });

  t.plan(1);
  t.not(data.title, undefined, 'title is not undefined');
});
