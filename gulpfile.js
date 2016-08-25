"use strict";
const gulp = require("gulp");
const watch = require("gulp-watch");
const typescript = require('gulp-typescript');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const mocha = require("gulp-mocha");
const sourcemap = require("gulp-sourcemaps");
const tslint = require("gulp-tslint");

const tsFiles = ["src/**/*.ts", "test/**/*.ts", "typings/**/**.ts"];
const jsFiles = ["src/**/*.js", "!node_modules/**/*.js", "test/**/*.js"];
const filesToLint = ["src/**/*.ts", "test/**/*.ts"];

var tsProject = typescript.createProject("tsconfig.json");


function lint() {
    return gulp.src(filesToLint)
        .pipe(tslint({
            formatter: "json"
        }))
        .pipe(tslint.report({ emitError: false }));
}

function build() {
    return gulp.src(tsFiles)
        .pipe(sourcemap.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(function (file) { return file.base; }))
        .pipe(notify({
            title: 'DONE COMPILATION TYPESCRIPT',
            message: 'Compile file  <%= file.relative %>',
            onLast: true,
            notifier: (args) => { }
        }));
}

gulp.task("compile", () => {
    return build();
});

gulp.task("lint", () => {
    return lint();
});

gulp.task("test", ["compile", "lint"], () => {
    return gulp.src("test/**/*.js")
        .pipe(mocha({
            reporter: "nyan"
        }));
});

gulp.task("watch", () => {
    gulp.watch(tsFiles, ["compile"]);
});

gulp.task("nodemon", ['compile'], () => {
    var started = false;

    nodemon({
        script: './src/app.js',
        tasks: ["compile"],
        watch: tsFiles,
        ext: "ts"
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});


gulp.task('sync', ['nodemon'], () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/public/**/*.*", "src/views/**/*.*"],
        browser: "chrome",
        port: 3000
    });
});