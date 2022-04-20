const _ = require('lodash');

const { LeemonsValidator } = global.utils;
const { stringSchema, booleanSchema, stringSchemaNullable } = require('./types');

const saveQuestionBankSchema = {
  type: 'object',
  properties: {
    id: stringSchema,
    name: stringSchema,
    tagline: stringSchemaNullable,
    summary: stringSchemaNullable,
    color: stringSchemaNullable,
    cover: stringSchemaNullable,
    state: stringSchemaNullable,
    tags: {
      type: 'array',
      items: stringSchema,
    },
    published: booleanSchema,
    questions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: [],
        properties: {
          id: stringSchema,
          type: stringSchema,
          level: stringSchemaNullable,
          withImages: booleanSchema,
          tags: {
            type: 'array',
            items: stringSchema,
            nullable: true,
          },
          question: stringSchema,
          properties: {
            type: 'object',
            additionalProperties: true,
          },
          clues: {
            type: 'array',
            items: stringSchema,
            nullable: true,
          },
        },
      },
    },
  },
  required: [],
  additionalProperties: false,
};

function validateSaveQuestionBank(data) {
  const schema = _.cloneDeep(saveQuestionBankSchema);
  if (data.published) {
    schema.required = ['name', 'tagline', 'summary', 'questions'];
    schema.properties.questions.items.required = ['type', 'question'];
  }
  const validator = new LeemonsValidator(schema);

  if (!validator.validate(data)) {
    throw validator.error;
  }
}

module.exports = {
  validateSaveQuestionBank,
};
