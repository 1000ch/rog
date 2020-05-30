const test = require('ava');
const {rog} = require('rog');
const {rogTitle} = require('..');

test('retrieve title', async t => {
  const data = await rog('https://google.co.jp/', {
    title: rogTitle
  });

  t.plan(1);
  t.not(data.title, undefined, 'title is not undefined');
});
