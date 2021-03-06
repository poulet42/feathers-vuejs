const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Determine host and port from Feathers configuration
const config = require('./config');
const proxy = 'http://' + (config.host || 'localhost') + ':' + (config.port || '3030') + '/';

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'vue-style-loader!css-loader!stylus-loader',
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      }
    ]
  },
  plugins: [
    // Browsersync webpack plugin
    new BrowserSyncPlugin({
      host: config.host || 'localhost',
      port: 3000,
      proxy: proxy,
      notify: false
    })
  ],
  devtool: '#eval-source-map'
};
