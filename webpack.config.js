const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const excludeUndefValues = require('./common/utils/excludeUndefValues');
const isProduction = process.env.NODE_ENV === 'production';

const styleConfig = ({ hashedClassNames = false, customLoaders = [] }) =>
  ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: excludeUndefValues({
          minimize: isProduction,
          sourceMap: true,
          modules: hashedClassNames,
          importLoaders: 1,
          localIdentName: hashedClassNames
            ? '[folder]__[local]___[hash:base64:5]'
            : undefined,
        }),
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () =>
            excludeUndefValues([
              require('postcss-import')({}),
              require('postcss-url')({ url: 'rebase' }),
              hashedClassNames ? require('postcss-nested')({}) : undefined,
              require('postcss-cssnext')({
                browsers: [
                  // enable CSS properties which require prefixes
                  '> 1%',
                  'Firefox ESR',
                  'Opera 12.1',
                  'Android >= 4.4',
                  'iOS >= 8.0',
                  'Chrome >= 30', // equivalent to Android 4.4 WebView
                  'Safari >= 9',
                ],
              }),
            ]),
        },
      },
    ].concat(customLoaders),
  });

module.exports = {
  entry: path.join(__dirname, '/client/src/app.js'),

  output: {
    path: path.join(__dirname, '/client/dist/bundles'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/client/src'),
      },
      {
        test: /\.css$/,
        use: styleConfig({}),
      },
      {
        test: /\.less$/,
        exclude: /antd\.less$/,
        use: styleConfig({
          hashedClassNames: true,
          customLoaders: [
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },
      {
        test: /antd\.less$/,
        use: styleConfig({
          hashedClassNames: false,
          customLoaders: [
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },
    ],
  },

  plugins: [new ExtractTextPlugin('[name].css')],

  devtool: isProduction ? null : 'cheap-eval-source-map',
};
