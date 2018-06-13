// 本插件是为了实现将 .njk 模板按源码位置输出到 fs
const NAME = 'NJKGenerator';
class NjkGenerator {
    constructor(options) {

    }
    apply(compiler) {
        console.log(Object.keys(compiler.hooks));
        compiler.hooks.done.tapAsync(NAME, (stats, callback) => {
            let {compilation} = stats;
            console.log(
                 Object.keys(stats),
                typeof compilation, 
                Object.keys(compilation),
                Object.keys(compilation.assets)
            );
            callback();
         })
    }
}

module.exports = NjkGenerator;