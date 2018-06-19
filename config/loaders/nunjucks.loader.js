const nunjucks = require('nunjucks');
const loaderUtils = require("loader-utils");
const  path = require('path')

let hasSet = false;
let viewRoot = null;
const njkLoader = function (file) {
	const options = loaderUtils.getOptions(this);
	const self = this;
	if (!hasSet) {
		nunjucks.configure(options.views, options);
		viewRoot = options.views;
		hasSet = true;
	}
	// 可缓存
	this.cacheable();
	var callback = this.async();
	const currentPath = this.resourcePath;
	let all = Object.keys(this);
	const relativePath = path.relative(viewRoot, currentPath);
	// console.log(currentPath, relativePath);
	console.log('oooooooooooXXXXXXXXXXXXXXXXXXXXXXXXXXXX00000000000',options);
	nunjucks.render(relativePath, {name:'test'}, function (err, res) {
		if (err) {
			// console.error(err);
			return callback(err);
		}
		console.log(res);
		self.emitFile(path.dirname(relativePath, path.extname(relativePath)) + '.html', res);
		callback(null, '');
	});
	// console.log(str, path.basename(relativePath, path.extname(relativePath)));
	
	// return '';
	// this.callback(null, nunjucks.render(relativePath, {name:'test'}) ) 
}

module.exports = njkLoader;