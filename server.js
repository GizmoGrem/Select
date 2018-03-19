const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const port = 3001;

new WebpackDevServer(webpack(config), {
  proxy: {
    '/api': {
      target: 'http://localhost',
      secure: true
    }
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000
  },
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log('error: ' + err);
  }
  console.log('Listening at localhost: ' + port);
});

