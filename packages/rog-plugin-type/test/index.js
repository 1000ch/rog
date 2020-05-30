const test = require('ava');
const {rog} = require('rog');
const {rogType} = require('..');

test('retrieve type', async t => {
  const data = await rog('https://google.co.jp/', {
    type: rogType
  });

  t.plan(1);
  t.not(data.type, undefined, 'type is not undefined');
});
