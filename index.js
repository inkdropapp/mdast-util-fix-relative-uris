'use strict'

var visit = require('unist-util-visit')

module.exports = fixRelativeURIs

function fixRelativeURIs(tree, baseURI = '') {
  visit(tree, 'link', resolve)

  return tree

  function resolve(node) {
    if (typeof node.url === 'string') {
      node.url = String(new URL(node.url, baseURI))
    }
  }
}
