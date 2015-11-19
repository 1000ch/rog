import test from 'ava';
import rog from '../';

test('resolve with fixed format json', t => {
  return rog('http://google.com').then(data => {
    t.plan(7);
    t.not(data.title, undefined, 'title is not undefined');
    t.not(data.type, undefined, 'type is not undefined');
    t.not(data.url, undefined, 'url is not undefined');
    t.not(data.image, undefined, 'image is not undefined');
    t.not(data.site, undefined, 'site is not undefined');
    t.not(data.description, undefined, 'description is not undefined');
    t.not(data.locale, undefined, 'locale is not undefined');
  });
});

test('reject if argument is none', t => {
  return rog().catch(error => {
    t.pass(error);
  });
});

test('reject if response is not HTML', t => {
  let image = 'http://placehold.it/1x1';
  return rog(image).catch(error => {
    t.pass(error);
  });
});
