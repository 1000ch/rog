import test from 'ava';
import rog from 'rog';

test('retrieve locale', async t => {
  const data = await rog('https://google.co.jp/', null, {
    locale: require('.')
  });

  t.plan(1);
  t.not(data.locale, undefined, 'locale is not undefined');
});
