import test from 'ava';
import rog from '../';

test('resolve with fixed format json', async function (t) {
  let data = await rog('http://google.com', null, {
    title       : require('../packages/rog-plugin-title'),
    type        : require('../packages/rog-plugin-type'),
    url         : require('../packages/rog-plugin-url'),
    image       : require('../packages/rog-plugin-image'),
    sitename    : require('../packages/rog-plugin-sitename'),
    description : require('../packages/rog-plugin-description'),
    locale      : require('../packages/rog-plugin-locale'),
  });

  t.plan(7);
  t.not(data.title, undefined, 'title is not undefined');
  t.not(data.type, undefined, 'type is not undefined');
  t.not(data.url, undefined, 'url is not undefined');
  t.not(data.image, undefined, 'image is not undefined');
  t.not(data.sitename, undefined, 'sitename is not undefined');
  t.not(data.description, undefined, 'description is not undefined');
  t.not(data.locale, undefined, 'locale is not undefined');
});

test('reject if argument is none', async function (t) {
  try {
    await rog();
  } catch (error) {
    t.plan(1);
    t.pass(error);
  }
});

test('reject if response is not HTML', async function (t) {
  try {
    await rog('http://placehold.it/1x1');
  } catch (error) {
    t.plan(1);
    t.pass(error);
  }
});
