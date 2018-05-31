const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const gulpData = require('gulp-data');
const watch = require('gulp-watch');
const rename = require('gulp-rename');

const nunjucks = require('gulp-nunjucks-render');
// const nunjucks = require('gulp-nunjucks');


const plumber = require('gulp-plumber');

const tplRoot = './src/tpls/';

// nunjucks env 配置，包括全局变量、filter等
const njConfig = `${tplRoot}nunjucks.config.js`;

const tplExts = 'njk|tpl|html|htm';
const tplsPath = `${tplRoot}**/!(_)*.+(${tplExts})`;
const dataPath = `${tplRoot}**/*.data.js`;

gulp.task('default', ['compile-tpls'], function () {
    // return watch({glob: './src/tpls/**/!(_)*.tpl'})
    return watch([tplsPath, dataPath], function () {
        gulp.start('compile-tpls')
    })
});


gulp.task('compile-tpls', () =>
    gulp.src(tplsPath)
        .pipe(plumber({
            errorHandler: err => console.log(err)
        }))
        .pipe( gulpData( getData) )
        // .pipe( nunjucks.compile() )
        .pipe( nunjucks({
            path: tplRoot,
            manageEnv: require(njConfig)
        }) )
        .pipe( rename({
            extname: '.html'
        }) )
        // .on('error', (err) => console.log(err) )
        .pipe( gulp.dest('./'))
);

//  获取模板对应的数据
function getData(file, cb) {
    let p = file.path;
    let obj = path.parse(p);
    obj.name += '.data';
    obj.ext = '.js';
    obj.base = obj.name + obj.ext;
    const res = path.format(obj);
    fs.access(res, fs.constants.F_OK, err => {
        if (err) {
            return cb(null, {});
        }
        // 预防数据被缓存而不更新
        delete require.cache[require.resolve(res)];
        let data = require(res);
        if ('function' === typeof data) {
            return cb(null, data());
        }
        return cb(null,data);
    })
    return res;
}