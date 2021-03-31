# mdast-util-fix-relative-uris

**[mdast][]** utility to fix relative URIs.

## Install

[npm][]:

```sh
npm install mdast-util-fix-relative-uris
```

## Use

Say we have the following markdown file, `example.md`:

```markdown
[link](about)
```

And our script, `example.js`, looks as follows:

```js
var fs = require("fs");
var fromMarkdown = require("mdast-util-from-markdown");
var fixRelativeURIs = require("mdast-util-fix-relative-uris");

var doc = fs.readFileSync("example.md");

var tree = fromMarkdown(doc);
var baseURL = "https://www.inkdrop.app/";
var fixedTree = fixRelativeURIs(tree, baseURL);

console.log(fixedTree);
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'root',
  children: [
    {
      type: 'paragraph',
      children: [
        {
          type: 'link',
          title: null,
          url: 'https://www.craftz.dog/about',
          children: [
            {
              type: 'text',
              value: 'link',
            }
          ],
        }
      ],
    }
  ],
}
```

## API

### `fixRelativeURIs(tree, baseURI)`

Fix relative URIs of links in the given [mdast][] tree.

#### Parameters

- `baseURI` (`string`) — The base URI

#### Returns

The given, modified, tree.

## License

[MIT][license] © [Takuya Matsuyama][author]

[mdast]: https://github.com/syntax-tree/mdast
[npm]: https://docs.npmjs.com/cli/install
[license]: license
[author]: https://www.craftz.dog/
