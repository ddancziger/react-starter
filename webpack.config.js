const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const childProcess = require('child_process')


process.env.BABEL_ENV = process.env.NODE_ENV;

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/index.html'),
  // icon: path.resolve(__dirname, 'src/favicon.ico'),
  node_modules: path.resolve(__dirname, 'node_modules'),
};

function getEnvVars(...extraVars) {
  // Get last commit hash
  // const commitHash = childProcess
  //   .execSync('git rev-parse --short HEAD')
  //   .toString()
  // 'process.env.COMMIT_HASH': JSON.stringify(commitHash),
  // Create env variables
  const envVars = ['NODE_ENV', 'npm_package_name', 'npm_package_version', 'npm_lifecycle_event', ...extraVars];
  // generate object with the env vars
  // envVars.reduce(
  //   (e, v) => {
  //     e[`process.env.${v}`] = JSON.stringify(process.env[v]);
  //     return e;
  //   },
  //   {
  //     'process.env.BUILD_DATE': JSON.stringify(new Date().toUTCString()),
  //   },
  // );
  return {};
}


function common() {
  return {
    devtool: 'source-map',
    output: {
      path: paths.dist,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [paths.src, paths.node_modules],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'eslint-loader', options: { emitWarning: !isProduction } },
          ],
          exclude: paths.node_modules,
        },
        {
          test: /\.css/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)(\?.*)?$/,
          use: 'url-loader?limit=100000',
          exclude: paths.node_modules,
        },
        {
          test: /\.(eot|otf|woff|ttf)?$/,
          use: 'url-loader',
          exclude: paths.node_modules,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(getEnvVars()),
      new HtmlWebpackPlugin({
        template: paths.html,
        // favicon: paths.icon,
      }),
    ],
  };
}

function production() {
  return {
    bail: true,
    entry: {
      app: ['babel-polyfill', paths.src],
    },
    output: {
      path: paths.dist,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
    },
    plugins: [
      new CleanPlugin([paths.dist]),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  };
}

function development() {
  return {
    entry: ['react-hot-loader/patch', 'babel-polyfill', paths.src],
    devServer: {
      // contentBase: paths.src,
      noInfo: true,
      hot: true,
      historyApiFallback: true,
      port: process.env.PORT || '9000',
    },
    performance: {
      hints: false,
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin(),
    ],
  };
}

module.exports =
  process.env.NODE_ENV === 'production'
    ? merge(common(), production())
    : merge(common(), development());
