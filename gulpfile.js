const gulp = require("gulp");
const jsMinify = require("gulp-uglify");
const cssMinify = require("gulp-minify-css");
const runSequence = require("run-sequence");
const imagemin = require("gulp-imagemin");
const clean = require("gulp-clean");
const rigger = require("gulp-rigger");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const watch = require("gulp-watch");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

const path = {
    src: {
        js: ["./app/script/*.js", "./lib/*.js"],
        css: ["./app/style/css.css", "./lib/bootstrap/*.css"],
        html:"./app/html/**/*.html",
        scss: "./app/style/css.scss"
    },
    build: {
        js: "build/js/",
        css: "build/style/",
        html: "build/html/"
    },
};

gulp.task("html", function () {
    gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('scss', function () {
    return gulp.src(path.src.scss)
     .pipe(sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./app/style/'))
     .pipe(reload({stream: true}));
});

gulp.task("css-minify", function (){
    return gulp.src(path.src.css)
    .pipe(cssMinify())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('reload-css', function(){
    runSequence('scss', 'css-minify');
});

gulp.task('images', function(){
    return gulp.src("./app/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], {
        verbose: true
    }))
    .pipe(gulp.dest('build/images/'))
    .pipe(reload({stream: true}));
});

gulp.task("js-minify", function (){
    return gulp.src(path.src.js)
    .pipe(jsMinify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('clean', function(){
    return gulp.src('build')
    .pipe(clean());
});

gulp.task('browser-sync', function(){
    browserSync({
        startPath: '/',
        server: {
            baseDir: 'build/html'
        },
        notify: false
    });
});

gulp.task('watch',function(){
    gulp.watch(path.src.html, ['html']);
    gulp.watch('app/style/*.scss', ['reload-css']);
});

gulp.task('run', function(){
    runSequence('clean', 'html', 'reload-css','js-minify', 'browser-sync', 'watch');
});

gulp.task('default', ['run']); 