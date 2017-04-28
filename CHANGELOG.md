# Changelog

## 1.9.3 - 28.04.2017

- Revert switch to `commander.js`

## 1.9.2 - 28.04.2017

- Lock `sass-graph` to `2.1.2` to prevent an issue insider docker, because the babel cache is not writable

## 1.9.1 - 08.12.2016

- Set correct base path for files in subfolders. Fixes #35.

## 1.9.0 - 02.12.2016

- Better error output which prints a nice overview of the problematic code
- Refactored code related to writing and reading imports
- Better test coverage
- Fix missing yargs dependency when installing with `npm install --production`

## 1.8.0 - 28.10.2016

- New `--production` flag to force production builds even in watch mode
- Print errors to `stderr` and properly exit with 1 on failed builds

## 1.7.0 - 24.10.2016

- Add a pretty cli interface. Try it out with `kiki --help`.
- Preserve relative file paths starting from glob pattern

## 1.6.1 - 24.10.2016

- Last release was incorrectly published on npm

## 1.6.0 - 24.10.2016

- Remove cssnano for now. It isn't safe for minifying even with the `safe` option is set to true.

## 1.5.0 - 04.10.2016

- Don't compile partials that are not imported by anything.

## 1.4.0 - 27.09.2016

- Don't remove existing vendor prefixes. This was too confusing for beta users.

## 1.3.0 - 27.09.2016

- Add node v4 support.

Node v6 will become the new LTS in the coming weeks anyway, but supporting node 4 is easy
so let's support it for know.

## 1.2.0 - 24.09.2016

- Add optional cssnext support

## 1.1.0 - 17.09.2106

By request the following feature was added:

- Add user config to disable automatic vendor prefixes

## 1.0.4 - 16.09.2016

- Make eslint a devDependency instead of a normal one

## 1.0.3 - 16.09.2016

- Fix wrong binary name (was kiki-bundler instead of kiki)

## 1.0.0 - 15.09.2016

I'm happy to announce that the first version is ready to be consumed publicly. Current supported features are:

- quick scss compilation with node-sass
- integrated autoprefixer
- ultra fast incremental builds in watch mode
