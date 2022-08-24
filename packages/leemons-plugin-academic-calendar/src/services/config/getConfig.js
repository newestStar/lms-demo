const _ = require('lodash');
const { table } = require('../tables');

async function getConfig(program, { transacting } = {}) {
  const config = await table.config.findOne({ program }, { transacting });
  if (config) {
    config.allCoursesHaveSameConfig = !!config.allCoursesHaveSameConfig;
    config.allCoursesHaveSameDates = !!config.allCoursesHaveSameDates;
    config.allCoursesHaveSameDays = !!config.allCoursesHaveSameDays;
    config.substagesDates = JSON.parse(config.substagesDates);
    config.courseEvents = JSON.parse(config.courseEvents);
    config.courseDates = JSON.parse(config.courseDates);
    config.breaks = JSON.parse(config.breaks);
  }
  return config;
}

module.exports = { getConfig };
