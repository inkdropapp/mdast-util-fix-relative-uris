var test = require('ava')
var fs = require('fs')
var fromMarkdown = require('mdast-util-from-markdown')
var toMarkdown = require('mdast-util-to-markdown')
var fixRelativeURIs = require('../')

test('relative path', (t) => {
  const md = `[link](about)`
  const mdast = fromMarkdown(md)
  t.is(typeof mdast, 'object')
  const resolved = fixRelativeURIs(mdast, 'https://www.craftz.dog/')
  t.log('fixed tree:', resolved)
  const result = toMarkdown(mdast)
  t.log('result:', result)
  t.is(typeof result, 'string')
  t.is(result, '[link](https://www.craftz.dog/about)\n')
})

test('absolute URL', (t) => {
  const md = `[link](https://www.inkdrop.app/)`
  const mdast = fromMarkdown(md)
  t.is(typeof mdast, 'object')
  const resolved = fixRelativeURIs(mdast, 'https://www.craftz.dog/')
  t.log('fixed tree:', resolved)
  const result = toMarkdown(mdast)
  t.log('result:', result)
  t.is(typeof result, 'string')
  t.is(result, '[link](https://www.inkdrop.app/)\n')
})

test('ignore anchor links', (t) => {
  const md = `[link](#about)`
  const mdast = fromMarkdown(md)
  t.is(typeof mdast, 'object')
  const resolved = fixRelativeURIs(mdast, 'https://www.craftz.dog/')
  t.log('fixed tree:', resolved)
  const result = toMarkdown(mdast)
  t.log('result:', result)
  t.is(typeof result, 'string')
  t.is(result, '[link](#about)\n')
})
