var gulp = require('gulp');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglifyJS = require('gulp-uglify-es').default;
var htmlMin = require('gulp-htmlmin');
var htmlClean = require('gulp-htmlclean');

var configs = {
    autoPrefixer: {
        overrideBrowserslist: [
            'last 2 versions',
            '> 1%',
            'Chrome >= 40',
            'Firefox >= 40',
            'ie >= 10',
            'Safari >= 8'
        ]
    },
    uglifyJS: {
        toplevel: true
    },
    cleanCSS: {
        compatibility: 'ie10'
    },
    htmlMin: {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
    }
};

function minifyJS() {
    return gulp.src('./public/**/*.js')
        .pipe(uglifyJS(configs.uglifyJS))
        .pipe(gulp.dest('./public'));
}

function minifyCSS() {
    return gulp.src('./public/**/*.css')
        .pipe(autoPrefixer(configs.autoPrefixer))
        .pipe(cleanCSS(configs.cleanCSS))
        .pipe(gulp.dest('./public'));
}

function minifyHTML() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlMin(configs.htmlMin))
        .pipe(htmlClean())
        .pipe(gulp.dest('./public'));
}

module.exports = {
    minifyJS: minifyJS,
    minifyCSS: minifyCSS,
    minifyHTML: minifyHTML
};

gulp.task('build', gulp.series(
    gulp.parallel(
        minifyJS,
        minifyCSS,
        minifyHTML
    )
));

gulp.task('default', gulp.series('build'));
