process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');

const boxen = require('boxen');
const path = require('path');
const webpackConfig = require('./webpack.config');

function getRelativePath(dir) {
  const relativePath = path.relative(process.cwd(), dir);

  if (relativePath.startsWith('.')) {
    return relativePath;
  }

  return `./${relativePath}`;
}

module.exports = async function startDevServer({ app, build, alias, publicFiles }) {
  const config = webpackConfig({ app, build, alias, publicFiles, isDev: false });
  const compiler = webpack(config);

  const startTime = Date.now();

  const spinner = ora(chalk`Starting {yellow Leemons} front build`).start();
  compiler.run((err, stats) => {
    if (stats.hasErrors()) {
      spinner.fail(chalk`{red Compilation failed with errors}`);
      return;
    }

    spinner.succeed(
      chalk`{green Compiled {yellow Leemons} successfully in ${(Date.now() - startTime) / 1000}s}`
    );

    console.log(
      boxen(
        chalk`{gray The app was built in} {underline ${getRelativePath(
          build
        )}}\n\n{gray To preview the app, run} {cyan leemonsFront preview}`,
        {
          margin: 1,
          padding: 1,
        }
      )
    );

    compiler.close(() => {});
  });
};
