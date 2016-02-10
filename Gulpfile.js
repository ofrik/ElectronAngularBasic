

'use strict';

var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var rename = require('gulp-rename');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var os = require('os');
var release_windows = require('./buil.windows');


var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});

gulp.task('scripts',function(){
    gulp.src(["./app/scripts/**/*.js","!app/scripts/**/*.min.js"]).
        pipe(rename({suffix:".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("app/scripts"))
        .pipe(reload({stream:true}));

});

gulp.task("browser-sync",function(){
   browserSync({
      server:{
          baseDir: "app/"
      }
   });
});

gulp.task("html",function(){
   gulp.src('./app/**/*.html')
       .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    return gulp.src('./app/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({stream:true}));
});

gulp.task('watch',function(){
    gulp.watch(["./app/scripts/**/*.js"],["scripts"]);
    gulp.watch(["./app/css/*.scss"],["sass"]);
    gulp.watch(["./app/**/*.html"],["html"]);
});

gulp.task('copy', ['clean'], function () {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: [
            './node_modules/**/*',
            '*.html',
            '*.css',
            'main.js',
            'package.json'
        ]
    });
});

gulp.task('build', ['copy'], function () {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            js: [uglify()]
        }))
        .pipe(gulp.dest('build/'));
});


gulp.task('run', function () {
    childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

gulp.task('build-electron', function () {
    switch (os.platform()) {
        case 'darwin':
            // execute build.osx.js 
            break;
        case 'linux':
            //execute build.linux.js
            break;
        case 'win32':
        console.log('sdf')
            return release_windows.build();
    }
});
