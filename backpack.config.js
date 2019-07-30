const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack: (config, options) => {
    config.context = path.resolve(__dirname, 'src');
    config.entry.main = './index.ts';
    config.output.path = path.resolve(__dirname, 'build');
    config.resolve.extensions = ['.ts', '.json'];

    config.module.rules = [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ];

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      })
    );

    return config;
  }
};
