const { src, watch, dest, parallel }   = require('gulp');
const browserSync = require('browser-sync').create(0);
const sass  = require('gulp-sass');

// compile sass into CSS & auto-inject into browsers 
function sassConv() {
    return src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

// move the static javascript files into our /src/js folder 
function js() {
    return src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js', 
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

// static server + watching scss/html files
function serve() {

    browserSync.init({
        server: "./src"
    });

    watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], sassConv);
    watch("src/*.html").on('change', browserSync.reload);
}

exports.sassConv = sassConv;
exports.js = js;
exports.serve = serve;
exports.default = parallel(sassConv, js, serve);