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
        js: "./app/script/**/*.js",
        css: "./app/style/css.css",
        lib: "./app/lib/**/*",
        html:"./app/html/*.html",
        scss: "./app/style/css.scss",
        images: "./app/images/**/*"
    },
    build: {
        js: "./build/script/",
        css: "./build/style/",
        html: "./build/html/",
        lib: "./build/lib/",
        images: "./build/images/"
    },
};

gulp.task("js-minify", function (){
    return gulp.src(path.src.js)
    // .pipe(jsMinify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task("html", function () {
    gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
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

gulp.task("lib", function (){
    return gulp.src(path.src.lib)
    .pipe(gulp.dest(path.build.lib))
    .pipe(reload({stream: true}));
});

gulp.task('reload-css', function(){
    runSequence('sass', 'css-minify');
});

gulp.task('images', function(){
    return gulp.src(path.src.images)
    // .pipe(imagemin([
    //     imagemin.gifsicle({interlaced: true}),
    //     imagemin.jpegtran({progressive: true}),
    //     imagemin.optipng({optimizationLevel: 5}),
    //     imagemin.svgo({
    //         plugins: [
    //             {removeViewBox: true},
    //             {cleanupIDs: false}
    //         ]
    //     })
    // ], {
    //     verbose: true
    // }))
    .pipe(gulp.dest(path.build .images))
    .pipe(reload({stream: true}));
});


gulp.task('clean', function(){
    return gulp.src('build')
    .pipe(clean());
});

gulp.task('browser-sync', function(){
    browserSync({
        startPath: '/html',
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('watch',function(){
    gulp.watch(path.src.html, ['html']);
    gulp.watch('app/style/*.scss', ['reload-css']);
    gulp.watch('app/script/*.js', ['js-minify']);
});

gulp.task('run', function(){
    runSequence(
        'clean', 
        'html', 
        'reload-css',
        'images',
        'js-minify',
        'browser-sync',
        'watch'
    );
});

gulp.task('default', ['run']); 