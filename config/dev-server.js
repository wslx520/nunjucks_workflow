const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
const express = require('express');
const app = express();

app.use(middleware(compiler, {
  // webpack-dev-middleware options
  contentBase: '/dist/'
}));
app.use(require("webpack-hot-middleware")(compiler));

app.listen(3000, () => console.log('Example app listening on port 3000!'))