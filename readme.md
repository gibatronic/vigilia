![Vigilia](http://gibatronic.github.io/vigilia/etc/vigilia.svg)

> from the latin vigilia */wiˈɡi.li.a/*, watch.

simple command line tool to watch and trigger multiple combinations of paths and commands.

## Usage

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gibatronic/vigilia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

```sh
npm install vigilia --save-dev
```

in your `makefile` or `package.json` declare the files you want to watch and the command that shall be run whenever something changes:

```
vigilia [options] pattern:command ...
```

for example, in a `package.json`:

```json
{
  "scripts": {
    "scripts": "...",
    "styles": "...",
    "watch": "node_modules/vigilia/bin/vigilia 'scripts/**/*.js':'npm run scripts' 'styles/**/*.scss':'npm run styles'"
  }
}
```

then start it with:

```sh
npm run watch
```

see? no more [grunt](http://gruntjs.com/), [gulp](http://gulpjs.com/) or even [make](https://www.gnu.org/software/make/) if you wish.

### Options

* `-h` `--help`
  <br>
  show vigilia's man page

* `-v` `--version`
  <br>
  show vigilia's version
