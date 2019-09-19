const gulp = require('gulp');

const clean = function () {
    const del = require('del');
    return del(['build']);
};

const install = function (done) {
    const run = require('gulp-run');
    run('npm prune').exec(err => {
        if (err) {
            console.log(err);
        }
        run('npm install').exec(err => {
            if (err) {
                console.log(err);
            }
            done();
        });
    });
};

const test = function (done) {
    const run = require('gulp-run');
    run('npm test').exec(err => {
        if (err) {
            console.log(err);
        }
        done();
    });
};

const assemble = function () {
    const zip = require('gulp-zip');
    return gulp.src(['**/*', '!node_module/**', 'package-lock.json', '!.git/**', '!.idea/**'])
        .pipe(zip('contacts.zip'))
        .pipe(gulp.dest('compressed/dist/'))
};

gulp.task('build', gulp.series(clean, install, test, assemble));
gulp.task('clean', clean);
