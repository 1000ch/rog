const test = require('ava');
const {rog} = require('../../rog');
const {rogTitle} = require('../../rog-plugin-title');
const {rogType} = require('../../rog-plugin-type');
const {rogUrl} = require('../../rog-plugin-url');
const {rogImage} = require('../../rog-plugin-image');
const {rogImages} = require('../../rog-plugin-images');
const {rogSitename} = require('../../rog-plugin-sitename');
const {rogDescription} = require('../../rog-plugin-description');
const {rogLocale} = require('../../rog-plugin-locale');

test('parse utf-8 encoded HTML', async t => {
  const data = await rog('https://google.com', {
    title: rogTitle,
    type: rogType,
    url: rogUrl,
    image: rogImage,
    images: rogImages,
    sitename: rogSitename,
    description: rogDescription,
    locale: rogLocale
  });

  t.plan(8);
  t.not(data.title, undefined, 'title is not undefined');
  t.not(data.type, undefined, 'type is not undefined');
  t.not(data.url, undefined, 'url is not undefined');
  t.not(data.image, undefined, 'image is not undefined');
  t.true(Array.isArray(data.images), 'images is empty');
  t.not(data.sitename, undefined, 'sitename is not undefined');
  t.not(data.description, undefined, 'description is not undefined');
  t.not(data.locale, undefined, 'locale is not undefined');
});

test('parse EUC-JP encoded HTML', async t => {
  const data = await rog('https://mixi.jp/', {
    title: rogTitle,
    type: rogType,
    url: rogUrl,
    image: rogImage,
    images: rogImages,
    sitename: rogSitename,
    description: rogDescription,
    locale: rogLocale
  });

  t.plan(8);
  t.not(data.title, undefined, 'title is not undefined');
  t.not(data.type, undefined, 'type is not undefined');
  t.not(data.url, undefined, 'url is not undefined');
  t.not(data.image, undefined, 'image is not undefined');
  t.true(Array.isArray(data.images), 'images is empty');
  t.not(data.sitename, undefined, 'sitename is not undefined');
  t.not(data.description, undefined, 'description is not undefined');
  t.not(data.locale, undefined, 'locale is not undefined');
});

test('parse iso-8859-1 encoded HTML', async t => {
  const data = await rog('http://www.mhlw.go.jp/index.shtml', {
    title: rogTitle,
    type: rogType,
    url: rogUrl,
    image: rogImage,
    images: rogImages,
    sitename: rogSitename,
    description: rogDescription,
    locale: rogLocale
  });

  t.plan(8);
  t.not(data.title, undefined, 'title is not undefined');
  t.not(data.type, undefined, 'type is not undefined');
  t.not(data.url, undefined, 'url is not undefined');
  t.not(data.image, undefined, 'image is not undefined');
  t.true(Array.isArray(data.images), 'images is empty');
  t.not(data.sitename, undefined, 'sitename is not undefined');
  t.not(data.description, undefined, 'description is not undefined');
  t.not(data.locale, undefined, 'locale is not undefined');
});

test('throw error with invalid URL', async t => {
  try {
    await rog('https://pretty.me/area/PRE13/ARE8/SUB803/100000002462/', {});
  } catch (error) {
    t.pass(error);
  }
});

test('reject if argument is none', async t => {
  try {
    await rog();
  } catch (error) {
    t.pass(error);
  }
});

test('reject if response is not HTML', async t => {
  try {
    await rog('https://cloud.githubusercontent.com/assets/1800018/24595005/62981086-186d-11e7-9a61-aa31f5d8cb72.gif');
  } catch (error) {
    t.pass(error);
  }
});
