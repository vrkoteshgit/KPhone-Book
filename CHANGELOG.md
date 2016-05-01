cofeescript-seed-project changelog
==================================

Edit `CHANGELOG.md` for your own project.
Using update date instead of semver convention for coffeescript-seed-project.


## Feb 18, 2014

- Update `package.json`.
    - Update `devDependencies`.
    - Add `engines` property.
    - Remove webpack task
- Add `CHANGELOG.md`.
- Update `mocha.opts` to support CoffeeScript 1.7+.
- Update `README.md` to reflect changes.
    - Add david-dm badge (watch dependencies)
- Use `through2` in place of `through`.
- Use webpack within `gulpile.js`.
- Use CoffeeScript files as primary source files.
- Update `test/test.coffee`.
- Replace `gulp-coffee` with webpack plugin `coffee-loader`.
- Generate dev source map file with webpack.
- Generate dist source map file with gulp-uglify.
- Remove `gulp-if`.
- Added mocha test automation task within `gulpfile.js`.
