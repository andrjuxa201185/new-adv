const gulp = require("gulp");
const jsMinify = require("gulp-uglify");
const cssMinify = require("gulp-minify-css");
const runSequence = require("run-sequence");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const gulpRiger = require("gulp-rigger");
const gulpSass = require("gulp-sass");
const gulpSourceMaps = require("gulp-sourcemaps");
const gulpWatch = require("gulp-watch");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const path = {
    scr : {
        js: ["./script/*.js", "./lib/*.js"],
    },
    build: {
        js: "build/js/",
        
    },
};



// gulp.task("html", function () {
//     return gulp.src
// })