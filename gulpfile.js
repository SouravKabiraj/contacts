const gulp = require('gulp');
const run = require('gulp-run');
const zip = require('gulp-zip');
const tslint = require('gulp-tslint');

const clean = function () {
    const del = require('del');
    return del(['build']);
};

const install = function (done) {
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
    run('npm test').exec(err => {
        if (err) {
            console.log(err);
        }
        done();
    });
};

const assemble = function () {
    return gulp.src(['**/*', '!node_module/**', 'package-lock.json', '!.git/**', '!.idea/**'])
        .pipe(zip('contacts.zip'))
        .pipe(gulp.dest('compressed/dist/'))
};

const lint = function () {
    return gulp.src(['**/*.ts', '!node_modules/**'])
        .pipe(tslint({
            formatter: 'stylish'
        }))
        .pipe(tslint.report({
            emitError: false
        }))
};

gulp.task('build', gulp.series(clean, lint, install, test, assemble));
gulp.task('clean', clean);
