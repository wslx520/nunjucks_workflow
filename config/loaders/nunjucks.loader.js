const nunjucks = require('nunjucks');
const loaderUtils = require("loader-utils");
const  path = require('path')

let hasSet = false;
let viewRoot = null;
const njkLoader = function (file) {
	const options = loaderUtils.getOptions(this);

	if (!hasSet) {
		nunjucks.configure(options.views, options);
		viewRoot = options.views;
		hasSet = true;
	}
	this.cacheable();
	const currentPath = this.resourcePath;
	let all = Object.keys(this);
	const relativePath = path.relative(viewRoot, currentPath);
	console.log(currentPath, relativePath);
	console.log('ooooooooooo',options);
	const str = nunjucks.render(relativePath, {name:'test'});
	console.log(str, path.basename(relativePath, path.extname(relativePath)));
	this.emitFile(path.basename(relativePath, path.extname(relativePath)) + '.html', str);
	return '';
	// this.callback(null, nunjucks.render(relativePath, {name:'test'}) ) 
}

module.exports = njkLoader;