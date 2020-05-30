const test = require('ava');
const {rog} = require('rog');
const {rogDescription} = require('..');

test('retrieve description', async t => {
  const data = await rog('https://google.co.jp/', {
    description: rogDescription
  });

  t.plan(1);
  t.not(data.description, undefined, 'description is not undefined');
});
