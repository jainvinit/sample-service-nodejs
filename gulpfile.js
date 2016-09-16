var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var del = require('del');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

var _srcRoot = 'api';
var _srcTs = `${_srcRoot}/**/*.ts`;
var _typings = 'typings/**/*.d.ts';
var _outputDir = 'dist';
var _outputSrcDir = `${_outputDir}/api`;
var _testTs = 'test/**/*.ts';
var _outputTestDir = 'test/';

gulp.task('default', ['build', 'watch']);

var tsSrcProject = ts.createProject('tsconfig.json'),
    tsTestProject = ts.createProject('tsconfig.json'); 

gulp.task('clean', ['clean:dist']);
gulp.task('ts', ['ts:src', 'ts:test']);
gulp.task('build', function (done) {
    runSequence('clean',
        ['ts', 'copy:config', 'copy:swagger']
    );
});

gulp.task('clean:dist', function() {
    return del(_outputDir, {force: true});
});

gulp.task('copy:config', function () {
    return gulp.src('config/**/*')
        .pipe(gulp.dest(`${_outputDir}/config`));
});

gulp.task('copy:swagger', function () {
    return gulp.src(`${_srcRoot}/swagger/**/*`, { base: _srcRoot })
        .pipe(gulp.dest(_outputSrcDir));
});

gulp.task('ts:src', function () {
    var tsResult = gulp.src([_srcTs, _typings])
        .pipe(ts(tsSrcProject));
 
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest(_outputSrcDir)),
        tsResult.js.pipe(gulp.dest(_outputSrcDir))
    ]);
});
 
gulp.task('ts:test', function() {
    var tsResult = gulp.src([_testTs, _typings])
        .pipe(ts(tsTestProject));
 
    return tsResult.js.pipe(gulp.dest(_outputTestDir));
});

gulp.task('testbuild', function () { console.log('Working!'); });

gulp.task('watch', function() {
    console.log('==> WATCH started <==');
    return merge([
        // see https://github.com/floatdrop/gulp-watch/issues/238
        watch([_srcTs, `!${_srcTs}~`], {verbose: false}, batch((events, done) => {
            events
                .on('data', () => {
                    gulp.start('ts:src', done);
                })
                .on('end', done);
        })),

        watch([_testTs, `!${_testTs}~`], batch((events, done) => {
            events
                .on('data', () => {
                    gulp.start('ts:test', done);
                })
                .on('end', done);
        })),

        watch([_typings, `!${_typings}~`], batch((events, done) => {
            events
                .on('data', () => {
                    gulp.start('build', done);
                })
                .on('end', done);
        }))
    ]);
});
