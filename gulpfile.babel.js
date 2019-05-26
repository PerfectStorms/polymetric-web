import { task, series, parallel, src, dest, watch } from 'gulp'
import yargs from 'yargs'
// import del from 'del'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import browsersync from 'browser-sync'

import babel from 'gulp-babel'
// import browserify from 'gulp-browserify'
import rename from 'gulp-rename'
// import uglifyjs from 'gulp-uglify'
// import concatjs from 'gulp-concat'
//
// import autoprefixer from 'gulp-autoprefixer'
// import concatcss from 'gulp-concat-css'
// import uglifycss from 'gulp-clean-css'

const argv = yargs.argv
browsersync.create()

task('js', () =>
  src('www/*.es6')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulpif(argv.serve, sourcemaps.write()))
    .pipe(dest('www')))

task('www', () =>
  src('www/*')
    .pipe(gulpif(argv.serve, browsersync.stream())))

task('browsersync', () =>
  browsersync({server: {baseDir: 'www'}}))

task('bs-watch', () => {
  watch(['www/*', '!www/*.js'], series('js', 'www'))})

task('default',
  argv.serve ? series('js', 'www', parallel('browsersync', 'bs-watch')) : series('js', 'www'))
