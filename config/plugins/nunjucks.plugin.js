// 本插件是为了实现将 .njk 模板按源码位置输出到 fs
// 且在html尾部自动加入依赖的JS
const chalk = require('chalk');
const NAME = 'NJKGenerator';

function createHTMLTag(name, props, children) {

}
class NjkGenerator {
    constructor(options) {

    }
    apply(compiler) {
        // for webpack 3
        compiler.plugin('emit', function (compilation, callback) {
            compilation.chunks.forEach(function(chunk) {
                // Explore each module within the chunk (built inputs):
                console.log(chalk.green('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓'));
                console.log(chunk.id, chunk.name)
                chunk.forEachModule(function(module) {
                    console.log(Object.keys(module))
                    // Explore each source file path that was included into the module:
                    module.fileDependencies.forEach(function(filepath) {
                    // we've learned a lot about the source structure now...
                        console.log(filepath);
                    });
                });
        
                // Explore each asset filename generated by the chunk:
                chunk.files.forEach(function(filename) {
                // Get the asset source for each file generated by the chunk:
                    var source = compilation.assets[filename].source();
                    console.log(chalk.red('------------------<>'), filename);
                });
            });
            for (var a in compilation.assets) {
                // console.log(a, compilation.assets[a])
            }
            callback();
        })
        // console.log(Object.keys(compiler.hooks));
        // compiler.hooks.emit.tapAsync(NAME, (compilation, callback) => {
        //     // let {compilation} = stats;
        //     // console.log(compilation.chunks, compilation.assets)
        //     // Explore each chunk (build output):
        //     compilation.chunks.forEach(function(chunk) {
        //         // Explore each module within the chunk (built inputs):
        //     console.log(chalk.green('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓'));
        //         console.log(Object.keys(chunk))
        //         chunk._modules.forEach(function(module) {
        //             console.log(Object.keys(module))
        //             // Explore each source file path that was included into the module:
        //             module.fileDependencies.forEach(function(filepath) {
        //             // we've learned a lot about the source structure now...
        //             console.log(filepath.module && Object.keys(filepath.module), Object.keys(filepath));
        //             });
        //         });
        //         // chunk.forEachModule(function(modul) {
        //         // // Explore each source file path that was included into the module:
        //         //     console.log(Object.keys(modul))
        //         //     modul.dependencies.forEach(function(filepath) {
        //         //         // we've learned a lot about the source structure now...
        //         //         console.log(filepath.module && Object.keys(filepath.module), Object.keys(filepath));
        //         //     });
        //         // });
        
        //         // Explore each asset filename generated by the chunk:
        //         chunk.files.forEach(function(filename) {
        //         // Get the asset source for each file generated by the chunk:
        //             // var source = compilation.assets[filename].source();
        //             // console.log(chalk.red('------------------<>'), filename);
        //         });
        //     });
        //     // console.log(
        //     //     Object.keys(stats),
        //     //     typeof compilation, 
        //     //     Object.keys(compilation),
        //     //     Object.keys(compilation.assets)
        //     // );
        //     // console.log(chalk.red('------------------'))
        //     // Object.keys(compilation.assets).forEach( asset => {
        //     //     console.log( Object.keys(compilation.assets[asset]), compilation.assets[asset]._value)
        //     // })
        //     callback();
        //  })
    }
}

module.exports = NjkGenerator;