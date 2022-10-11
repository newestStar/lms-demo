module.exports = {
  modelName: 'assignableInstances',
  options: {
    useTimestamps: true,
  },
  attributes: {
    assignable: {
      type: 'string',
      options: {
        notNull: true,
      },
    },
    alwaysAvailable: {
      type: 'boolean',
      options: {
        notNull: true,
      },
    },
    duration: {
      type: 'string',
    },
    gradable: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 0,
      },
    },
    requiresScoring: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 0,
      },
    },
    allowFeedback: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 0,
      },
    },
    showResults: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 1,
      },
    },
    showCorrectAnswers: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 1,
      },
    },
    sendMail: {
      type: 'boolean',
    },
    messageToAssignees: {
      type: 'richtext',
    },
    curriculum: {
      type: 'json',
    },
    metadata: {
      type: 'json',
    },
    relatedAssignableInstances: {
      type: 'json',
    },
    event: {
      type: 'uuid',
      /*
      references: {
        collection: 'plugins_calendar::events',
      },
       */
    },
    addNewClassStudents: {
      type: 'boolean',
      options: {
        notNull: true,
        defaultTo: 0,
      },
    },
  },
  primaryKey: {
    type: 'uuid',
    name: 'id',
  },
};
