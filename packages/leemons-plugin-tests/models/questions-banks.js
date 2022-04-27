module.exports = {
  modelName: 'questions-banks',
  collectionName: 'questions-banks',
  options: {
    useTimestamps: true,
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    program: {
      references: {
        collection: 'plugins_academic-portfolio::programs',
      },
    },
    published: {
      type: 'boolean',
      options: {
        defaultTo: false,
      },
    },
    asset: {
      specificType: 'varchar(255)',
    },
  },
  primaryKey: {
    name: 'id',
    specificType: 'varchar(255)',
  },
};
