const { taskSubjects } = require('../../table');

module.exports = async function addSubjects(task, subject, { transacting } = {}) {
  if (!subject) {
    return false;
  }

  const subjects = Array.isArray(subject) ? subject : [subject];

  try {
    await taskSubjects.createMany(
      subjects.map((s) => ({
        task,
        subject: s.subject,
        level: s.level,
        course: s.course,
      })),
      { transacting }
    );

    return true;
  } catch (e) {
    throw new Error(`Error adding subjects to task ${task.id}: ${e.message}`);
  }
};
