import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import babiliWebpackPlugin from 'babili-webpack-plugin';
import compact from 'lodash/compact';

export default {
  target: 'web',
  devtool: (() => {
    if (process.env.NODE_ENV === 'prod') {
      return 'cheap-source-map';
    }
    return 'cheap-eval-source-map';
  })(),
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {browsers: ['last 1 versions']}
            }]
          ],
          plugins: [
            ['transform-react-jsx', {
              pragma: 'h'
            }],
            'transform-decorators-legacy',
            'transform-class-properties'
          ]
        }
      }
    ]
  },
  plugins: compact([
    process.env.NODE_ENV === 'prod' && new babiliWebpackPlugin(),
    new htmlWebpackPlugin({title: 'example-picodom-mobx'})
  ])
}
