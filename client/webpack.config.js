const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true, // clean build folder before new build
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader',{
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                parser: 'postcss-scss'
              }
            }
          },],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        issuer: /\.[jt]sx?$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true, // for React Router
    hot: true,
    port: 3000,
    proxy: {
     '/api': {
      // target: 'http://backend-service:5000',
      target:"http://localhost:5000",
      changeOrigin: true,
    }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  mode: 'development',
};
