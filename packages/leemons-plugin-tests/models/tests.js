module.exports = {
  modelName: 'tests',
  collectionName: 'tests',
  options: {
    useTimestamps: true,
  },
  attributes: {
    questionBank: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
    level: {
      type: 'string',
    },
    statement: {
      type: 'text',
    },
    instructionsForTeacher: {
      type: 'text',
    },
    instructionsForStudent: {
      type: 'text',
    },
  },
  primaryKey: {
    name: 'id',
    specificType: 'varchar(255)',
  },
};
