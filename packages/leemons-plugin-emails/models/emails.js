module.exports = {
  modelName: 'emails',
  collectionName: 'emails',
  options: {
    useTimestamps: true,
  },
  attributes: {
    name: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    templateName: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    language: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    subject: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    html: {
      type: 'richtext',
      textType: 'mediumtext',
      options: {
        notNull: true,
      },
    },
  },
  primaryKey: {
    type: 'uuid',
  },
};
