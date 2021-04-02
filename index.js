'use strict'

var visit = require('unist-util-visit')

module.exports = fixRelativeURIs

function fixRelativeURIs(tree, baseURI = '') {
  if (typeof baseURI !== 'string') throw new Error('baseURI is required')
  visit(tree, 'link', resolve)

  return tree

  function resolve(node) {
    if (typeof node.url === 'string' && node.url.charAt(0) !== "#") {
      node.url = String(new URL(node.url, baseURI))
    }
  }
}
