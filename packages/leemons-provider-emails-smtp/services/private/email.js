const _ = require('lodash');
const { htmlToText } = require('nodemailer-html-to-text');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

let _transporters = null;

const table = {
  config: leemons.query('providers_emails-smtp::config'),
};

class Email {
  static async saveConfig(config) {
    if (config.id) {
      return table.config.update({ id: config.id }, config);
    }
    return table.config.create(config);
  }

  static async removeConfig(id) {
    return table.config.delete({ id });
  }

  static async getProviders() {
    return table.config.find();
  }

  static async getTransporters() {
    if (!_transporters) {
      const configs = await table.config.find();
      if (!configs.length) return null;
      _transporters = _.map(configs, (config) => Email.getTransporterByConfig(config));
    }
    console.log(`SMTP tiene ${_transporters.length} transporters`);
    return _transporters;
  }

  static getTransporterByConfig(config) {
    const transporter = global.utils.nodemailer.createTransport({
      host: config.host,
      port: parseInt(config.port, 10),
      secure: !!config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
    transporter.use('compile', htmlToText());
    transporter.use('compile', inlineBase64());
    return transporter;
  }
}

module.exports = Email;
