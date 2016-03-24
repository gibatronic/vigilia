![Vigilia](http://gibatronic.github.io/vigilia/etc/vigilia.svg)

> From the latin vigilia */wiˈɡi.li.a/*, watch.

Simple command line tool to watch and trigger multiple combinations of paths and commands.

[![Build Status](https://travis-ci.org/gibatronic/vigilia.svg?branch=master)](https://travis-ci.org/gibatronic/vigilia) ![Downloads](https://img.shields.io/npm/dt/vigilia.svg) [![Gitter](https://badges.gitter.im/gibatronic/vigilia.svg)](https://gitter.im/gibatronic/vigilia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Usage

```sh
npm install vigilia --save-dev
```

In your `makefile` or `package.json` declare the files you want to watch and the command that shall be run whenever something changes:

```
vigilia [options] pattern:command ...
```

For example, in a `package.json`:

```json
{
  "scripts": {
    "scripts": "...",
    "styles": "...",
    "watch": "node_modules/vigilia/bin/vigilia 'scripts/**/*.js':'npm run scripts' 'styles/**/*.scss':'npm run styles'"
  }
}
```

Then start it with:

```sh
npm run watch
```

See? No more [grunt](http://gruntjs.com/), [gulp](http://gulpjs.com/) or even [make](https://www.gnu.org/software/make/) if you wish.

### Options

* `-h` `--help`
  <br>
  Show vigilia's man page

* `-v` `--version`
  <br>
  Show vigilia's version
