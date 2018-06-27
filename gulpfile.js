const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const gulpData = require('gulp-data');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const through2 = require('through2');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
// const through2 = require('through2');

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

function replaceSuffix() {
    const pattern =/-[0-9a-f]{8,10}-?\.[^"']*/gmi; //匹配出-7ef5d9ee29.css，用于后面做文章
    return through2.obj(function(file, encoding, done) {
        console.log(String(file.contents))
        let content =String(file.contents).replace(pattern,function(match, pos, origin){
            console.log('match', match)
            const pat=/[0-9a-f]{8,10}-?/gi;  //匹配出7ef5d9ee29，用于后面拼接
            if(pat.test(match)){
                console.log(RegExp['$\''],RegExp['$&'])
                return  RegExp['$\''].concat('?v=', RegExp['$&']);//如果$'和$&这句话看不懂，红宝书第五章正则表达式部分该复习了；
            }else{
                return match;
            }
        });
        file.contents = new Buffer(content);
        this.push(file);
        done();
    });
}
// gulp.task('cls',function () {
//     return gulp.src([
//         'dist'
//     ]).pipe(clean());
// });

gulp.task('revC',function(){
    return gulp.src('dist/css/*.css')
    .pipe(rev())
    .pipe(rev.manifest({merge:true}))
    .pipe(replaceSuffix())  //利用上面写的方法替换得到类似index.css?v=7ef5d9ee29的样式
    .pipe(gulp.dest('dist'));
});
gulp.task('update',['revC'],function (cb) {
    gulp.src(['dist/rev-manifest.json', 'dist/index.html'])
        .pipe(revCollector({
            replaceReved: function (basename, ext, versionReg) {
                return basename + ext + '(' + versionReg + ')+';
            },
            revSuffix: '\\?v=[0-9a-f]{8,10}-?'  //利用revCollector的可配置，去满足我们需要的模式；
        }))
        // .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .on('end', cb);
});