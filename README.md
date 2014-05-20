# express-pager

## Install

```sh
$ npm i --save express-pager
```

## Usage:

```js
var pager = require('express-pager')
app.use('/page', pager())
```

```sh
$ mkdir views/page
$ echo '| hello, world' > views/page/hello.jade
$ curl http://localhost:3000/page/hello
hello, world
```

### Different directory

```js
app.use('/help', pager({ dir: 'help' }))
```

### List of pages

```js
app.use('/page', pager({ autoindex: true }))
```

## Options

- views - path to *views* directory
- directory - subdirectory with templates
- tplSuffix - .jade 
- autoindex - auto generate list of pages in /
- hrefPrefix  


