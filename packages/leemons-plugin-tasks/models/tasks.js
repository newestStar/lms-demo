module.exports = {
  modelName: 'tasks',
  attributes: {
    tagline: {
      type: 'string',
    },
    level: {
      type: 'string',
    },
    summary: {
      type: 'richtext',
    },
    cover: {
      type: 'string',
    },
    // TODO: Add cover cropping
    color: {
      type: 'string',
    },
    methodology: {
      type: 'string',
    },
    recommendedDuration: {
      type: 'integer',
    },
    statement: {
      type: 'richtext',
    },
    development: {
      type: 'richtext',
    },
    submissions: {
      type: 'string',
    },
    preTask: {
      type: 'string',
    },
    preTaskOptions: {
      type: 'string',
    },
    selfReflection: {
      type: 'string',
    },
    selfReflectionDescription: {
      type: 'string',
    },
    feedback: {
      type: 'string',
    },
    instructionsForTeacher: {
      type: 'richtext',
    },
    instructionsForStudent: {
      type: 'richtext',
    },
    center: {
      type: 'uuid',
    },
    program: {
      type: 'uuid',
    },
    // Track the current state, including setup steps
    state: {
      type: 'string',
    },
    published: {
      type: 'boolean',
      options: {
        defaultTo: false,
      },
    },
  },
  primaryKey: {
    specificType: 'varchar(255)',
  },
};
