const { validateSubjects } = require('../../helpers/validators/subjects');
const { subjects: table } = require('../tables');

module.exports = async function saveSubjects(assignable, subjects, { transacting } = {}) {
  try {
    if (!subjects) {
      return [];
    }

    validateSubjects(subjects);

    await table.createMany(
      subjects.map(({ subject, level, curriculum }) => ({
        assignable,
        subject,
        level,
        curriculum: JSON.stringify(curriculum),
      })),
      { transacting }
    );

    return subjects.map(({ subject, level, curriculum }) => ({
      assignable,
      subject,
      level,
      curriculum,
    }));
  } catch (e) {
    throw new Error(`Failed to create subjects: ${e.message}`);
  }
};
