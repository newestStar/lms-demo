const winston = require('winston');
const _ = require('lodash');
const { v4: uuid } = require('uuid');
const transports = require('./transports');

module.exports = async ({ id = uuid() } = {}) => {
  const logger = winston.createLogger({
    transports: await transports({ id }),
  });

  logger.id = id;

  // Get the desired methods only
  const log = _.fromPairs(
    Object.entries(
      _.pick(logger, [
        'id',
        'profile',
        'startTimer',
        'on',
        ...Object.keys(winston.config.npm.levels),
      ])
      // Bind the methods to the logger (required by winston)
    ).map(([key, value]) => {
      if (_.isFunction(value)) {
        return [key, value.bind(logger)];
      }
      return [key, value];
    })
  );

  Object.defineProperty(log, 'level', {
    set(value) {
      logger.level = value;
    },
    get() {
      return logger.level;
    },
  });

  // Throw error
  log.throw = (e) => {
    // Log error
    logger.error(logger.isDebugEnabled() ? e.stack : e.message);

    // Stop listening to other logs
    [...Object.keys(winston.config.npm.levels), 'throw'].forEach((level) => {
      log[level] = () => {};
    });
    // Stop winston stream
    logger.end();

    // When stream finished, send exit signal
    logger.on('finish', () => {
      if (process.send) process.send('exit');
      else process.exit();
    });
  };

  process.once('uncaughtException', log.throw);

  process.once('unhandledRejection', log.throw);

  // Return as object
  return log;
};
