const _ = require('lodash');
const { table } = require('../tables');

async function getProgramSubjectDigits(program, { transacting } = {}) {
  const { subjectsDigits } = await table.programs.findOne(
    { id: program },
    { columns: ['subjectsDigits'], transacting }
  );
  return subjectsDigits;
}

module.exports = { getProgramSubjectDigits };
