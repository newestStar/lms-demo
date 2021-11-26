module.exports = {
  modelName: 'class-teacher',
  collectionName: 'class-teacher',
  options: {
    useTimestamps: true,
  },
  attributes: {
    class: {
      references: {
        collection: 'plugins_academic-portfolio::class',
      },
    },
    teacher: {
      references: {
        collection: 'plugins_users::user-agent',
      },
    },
    // main-teacher | teacher
    type: {
      type: 'string',
      options: {
        defaultTo: 'teacher',
      },
    },
  },
  primaryKey: {
    type: 'uuid',
  },
};
