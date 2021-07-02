const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const slugify = require('slugify');
const squirrelly = require('squirrelly');
const { env } = require('./env');
const { getModel, generateModelName } = require('./model');
const buildQuery = require('./queryBuilder');
const { parseFilters } = require('./parseFilters');
const getStackTrace = require('./getStackTrace');
const LeemonsValidator = require('./leemons-validator');
const { settledResponseToManyResponse } = require('./settled-response-to-many-response');
const { HttpError, returnError } = require('./http-error');
const { getAvailablePort } = require('./port');
const paginate = require('./paginate');
const randomString = require('./randomString');
const { withTransaction } = require('./withTransaction');

module.exports = {
  env,
  getModel,
  generateModelName,
  buildQuery,
  parseFilters,
  getStackTrace,
  getAvailablePort,
  nodemailer,
  LeemonsValidator,
  HttpError,
  returnError,
  bcrypt,
  jwt,
  settledResponseToManyResponse,
  aws,
  paginate,
  randomString,
  slugify,
  withTransaction,
  squirrelly,
};
