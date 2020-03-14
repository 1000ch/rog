import test from 'ava';
import rog from 'rog';

test('retrieve sitename', async t => {
  const data = await rog('https://google.co.jp/', null, {
    sitename: require('.')
  });

  t.plan(1);
  t.not(data.sitename, undefined, 'sitename is not undefined');
});
