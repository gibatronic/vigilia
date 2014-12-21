# Vigilia

> from the latin vigilia */wiˈɡi.li.a/*, watch.

simple command line tool to watch and trigger multiple combinations of paths and commands.

## Intended usage

```sh
npm install vigilia --save-dev
```

in your `makefile` or `package.json` declare the files you want to watch and the command that shall be run whenever something changes:

```
node_modules/vigilia/bin/vigilia pattern:command ...
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
