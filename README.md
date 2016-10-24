[![Build Status](https://travis-ci.org/marvinhagemeister/kiki.svg?branch=master)](https://travis-ci.org/marvinhagemeister/kiki)

# Kiki Bundler

Kiki-Bundler is an opiniated frontend bundler, providing a great out-of-the-box
bundling experience with minimal configuration need.

At work we got frustrated with slow watch-tasks, when tools don't support incremental
building (except for [rollup](https://github.com/rollup/rollup/issues), which is awesome!).
Having recently inherited a huge legacy project with a lot of different root `scss` files,
we needed something faster. The existing code used `grunt` which took up to 10s to compile.

These simple benchmarks were taken on my Macbook Pro 13" 2016.

| Tool | Compiler | Complete Build | incremental Build |
|------|----------|----------------|-------------------|
| [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) | Ruby-Sass | 10s | 10s |
| [grunt-sass](https://github.com/sindresorhus/grunt-sass) | Libsass | 2.1s | 1.8s |
| kiki + [autoprefixer](https://github.com/postcss/autoprefixer) | Libsass | 1.8s | 150 - 300ms |

So yeah, kiki is a **LOT** faster even with [autoprefixer](https://github.com/postcss/autoprefixer) included.

Currently only sass compilation is supported, but support for javascript via rollup or webpack is planned.

## Usage

```bash
npm install --save-dev kiki-bundler
```

Add a config called `kiki.config.json` at the project root:

```json
{
  "sass": {
    "src": "path/to/my/scss",
    "dest": "path/for/compiled/output"
  }
}
```

Add kiki to your npm scripts in your `package.json`:

```json
{
  "scripts": {
    "build": "kiki build",
    "watch": "kiki watch"
  }
}
```

## Configuration Options

### Sass

| Option | type | default | Description |
|---|---|---|---|
| `src` | string | null | Path to scss root directory |
| `dest` | string | null | Path to output directory |
| `addVendorPrefixes` | boolean | true | automatic vendor prefix insertion via autoprefixer |
| `cssnext` | boolean | false | use tomorrows css features today |

## CLI-Arguments

```bash
Usage: kiki <command> [options]

Commands:
  watch  Watch for file changes and compile immediately
  build  Build minified production files

Options:
  -c, --config   Path to config file      [string] [default: "kiki.config.json"]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  kiki build -c myconfig.json

Copyright 2016 Marvin Hagemeister
```

## Why the name?

At work we have quite a football table culture (which is called `Kicker` in German) and some of us even play in the german football table league.
It only made sense to name the tools we use daily accordingly.
