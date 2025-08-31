const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  
  return {
    entry: './src/index.ts',
    mode: argv.mode || 'production',
    devtool: isDevelopment ? 'eval-source-map' : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: isDevelopment ? 'bundle.js' : 'bundle.[contenthash].js',
      path: path.resolve(__dirname, '../assets'),
      clean: true,
    },
    optimization: {
      minimize: !isDevelopment,
      splitChunks: isDevelopment ? false : {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: isDevelopment ? false : {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
        },
      }),
    ],
  };
};