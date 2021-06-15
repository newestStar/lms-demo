module.exports = {
  modelName: 'permission-action',
  collectionName: 'permission-action',
  options: {
    useTimestamps: true,
  },
  attributes: {
    permissionName: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    action: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
  },
  primaryKey: {
    type: 'uuid',
  },
};
