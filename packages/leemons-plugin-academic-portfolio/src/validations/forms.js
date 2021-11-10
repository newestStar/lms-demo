const { LeemonsValidator } = global.utils;
const { numberSchema } = require('leemons-plugin-menu-builder/src/validations/types');
const _ = require('lodash');
const {
  stringSchema,
  booleanSchema,
  integerSchema,
  arrayStringSchema,
  integerSchemaNullable,
} = require('./types');
const { programsByIds } = require('../services/programs/programsByIds');
const { table } = require('../services/tables');
const {
  programCanHaveCoursesOrHaveCourses,
} = require('../services/programs/programCanHaveCoursesOrHaveCourses');
const { subjectNeedCourseForAdd } = require('../services/subjects/subjectNeedCourseForAdd');
const {
  generateNextSubjectInternalId,
} = require('../services/subjects/generateNextSubjectInternalId');

const addProgramSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    centers: arrayStringSchema,
    abbreviation: {
      type: 'string',
      minLength: 1,
      maxLength: 8,
    },
    credits: integerSchemaNullable,
    maxGroupAbbreviation: integerSchema,
    maxGroupAbbreviationIsOnlyNumbers: booleanSchema,
    maxNumberOfCourses: integerSchema,
    haveSubstagesPerCourse: booleanSchema,
    haveKnowledge: booleanSchema,
    maxKnowledgeAbbreviation: integerSchemaNullable,
    maxKnowledgeAbbreviationIsOnlyNumbers: booleanSchema,
    subjectsFirstDigit: {
      type: 'string',
      enum: ['none', 'course'],
    },
    subjectsDigits: integerSchema,
  },
  required: [
    'name',
    'centers',
    'abbreviation',
    'credits',
    'maxGroupAbbreviation',
    'maxGroupAbbreviationIsOnlyNumbers',
    'haveSubstagesPerCourse',
    'haveKnowledge',
    'subjectsFirstDigit',
    'subjectsDigits',
  ],
  additionalProperties: true,
};

const addProgramSubstage1Schema = {
  type: 'object',
  properties: {
    substagesFrequency: {
      type: 'string',
      enum: ['year', 'semester', 'trimester', 'quarter', 'month', 'week', 'day'],
    },
    numberOfSubstages: numberSchema,
    useDefaultSubstagesName: booleanSchema,
  },
  required: ['substagesFrequency', 'numberOfSubstages', 'useDefaultSubstagesName'],
  additionalProperties: true,
};

const addProgramSubstage2Schema = {
  type: 'object',
  properties: {
    maxSubstageAbbreviation: numberSchema,
    maxSubstageAbbreviationIsOnlyNumbers: booleanSchema,
    substages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: stringSchema,
          abbreviation: stringSchema,
        },
      },
    },
  },
  required: ['maxSubstageAbbreviation', 'maxSubstageAbbreviationIsOnlyNumbers', 'substages'],
  additionalProperties: true,
};

function validateAddProgram(data) {
  let validator = new LeemonsValidator(addProgramSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  // ES: Si hay mas de un curso puede tener substages
  if (data.haveSubstagesPerCourse) {
    validator = new LeemonsValidator(addProgramSubstage1Schema);

    if (!validator.validate(data)) {
      throw validator.error;
    }

    if (!data.useDefaultSubstagesName) {
      validator = new LeemonsValidator(addProgramSubstage2Schema);

      if (!validator.validate(data)) {
        throw validator.error;
      }
    }
  }
}

function validateSubstagesFormat(programData, substages) {
  if (substages.length < programData.numberOfSubstages)
    throw new Error('The number of substages is less than the number of substages specified');
  _.forEach(substages, (substage) => {
    if (substage.abbreviation.length > programData.maxSubstageAbbreviation)
      throw new Error('The substage abbreviation is longer than the specified length');
    if (programData.maxSubstageAbbreviationIsOnlyNumbers && !/^[0-9]+$/.test(substage.abbreviation))
      throw new Error(
        'The substage abbreviation must be only numbers and the length must be the same as the specified length'
      );
  });
}

const addKnowledgeSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    abbreviation: stringSchema,
    color: stringSchema,
    icon: stringSchema,
    program: stringSchema,
    credits_course: integerSchemaNullable,
    credits_program: integerSchemaNullable,
  },
  required: ['name', 'abbreviation', 'program', 'color', 'icon'],
  additionalProperties: false,
};

async function validateAddKnowledge(data, { transacting } = {}) {
  const validator = new LeemonsValidator(addKnowledgeSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const [program] = await programsByIds(data.program, { transacting });

  if (!program) {
    throw new Error('The program does not exist');
  }

  // ES: Comprobamos si el programa puede tener areas de conocimiento
  if (!program.haveKnowledge) {
    throw new Error('The program does not have knowledges');
  }

  if (program.maxKnowledgeAbbreviation) {
    // ES: Comprobamos si el nombre del conocimiento es mayor que el maximo
    if (data.abbreviation.length > program.maxKnowledgeAbbreviation)
      throw new Error('The knowledge abbreviation is longer than the specified length');
  }

  // ES: Comprobamos si el nobre del conocimiento es solo numeros
  if (program.maxKnowledgeAbbreviationIsOnlyNumbers && !/^[0-9]+$/.test(data.abbreviation))
    throw new Error('The knowledge abbreviation must be only numbers');

  // ES: Comprobamos si el conocimiento ya existe
  const knowledge = await table.knowledges.count(
    {
      abbreviation: data.abbreviation,
      program: program.id,
    },
    { transacting }
  );

  if (knowledge) throw new Error('The knowledge already exists');
}

const addSubjectTypeSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    groupVisibility: booleanSchema,
    program: stringSchema,
    credits_course: integerSchemaNullable,
    credits_program: integerSchemaNullable,
  },
  required: ['name', 'groupVisibility', 'program'],
  additionalProperties: false,
};
async function validateAddSubjectType(data, { transacting } = {}) {
  const validator = new LeemonsValidator(addSubjectTypeSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const count = await table.programs.count({ id: data.program }, { transacting });
  if (!count) {
    throw new Error('The program does not exist');
  }

  // ES: Comprobamos que no exista ya el subject type
  const subjectTypeCount = await table.subjectTypes.count(
    {
      program: data.program,
      name: data.name,
    },
    { transacting }
  );

  if (subjectTypeCount) throw new Error('The subject type already exists');
}

const updateSubjectTypeSchema = {
  type: 'object',
  properties: {
    id: stringSchema,
    name: stringSchema,
    groupVisibility: booleanSchema,
    credits_course: integerSchemaNullable,
    credits_program: integerSchemaNullable,
  },
  required: ['id', 'name', 'groupVisibility'],
  additionalProperties: false,
};
async function validateUpdateSubjectType(data, { transacting } = {}) {
  const validator = new LeemonsValidator(updateSubjectTypeSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const subjectType = await table.subjectTypes.findOne({ id: data.id }, { transacting });

  if (!subjectType) {
    throw new Error('The subject type does not exist');
  }

  // ES: Comprobamos que no exista ya el subject type
  const subjectTypeCount = await table.subjectTypes.count(
    {
      id_$ne: data.id,
      program: subjectType.program,
      name: data.name,
    },
    { transacting }
  );

  if (subjectTypeCount) throw new Error('The subject type already exists');
}

const addCourseSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    abbreviation: stringSchema,
    program: stringSchema,
  },
  required: ['name', 'abbreviation', 'program'],
  additionalProperties: false,
};
async function validateAddCourse(data, { transacting } = {}) {
  const validator = new LeemonsValidator(addCourseSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const program = await table.programs.findOne({ id: data.program }, { transacting });
  if (!program) {
    throw new Error('The program does not exist');
  }

  // ES: Comprobamos que no se sobrepase el numero maximo de cursos
  const courseCount = await table.groups.count(
    { program: data.program, type: 'course' },
    { transacting }
  );
  if (courseCount >= program.maxNumberOfCourses) {
    throw new Error('The program has reached the maximum number of courses');
  }

  // ES: Comprobamos que no exista ya el curso
  const groupCount = await table.groups.count(
    {
      abbreviation: data.abbreviation,
      program: data.program,
      type: 'course',
    },
    { transacting }
  );

  if (groupCount) throw new Error('The course already exists');
}

const addGroupSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    abbreviation: stringSchema,
    program: stringSchema,
  },
  required: ['name', 'abbreviation', 'program'],
  additionalProperties: false,
};
async function validateAddGroup(data, { transacting } = {}) {
  const validator = new LeemonsValidator(addGroupSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const program = await table.programs.findOne({ id: data.program }, { transacting });
  if (!program) {
    throw new Error('The program does not exist');
  }

  if (program.maxGroupAbbreviation) {
    // ES: Comprobamos si el nombre del grupo es mayor que el maximo
    if (data.abbreviation.length > program.maxGroupAbbreviation)
      throw new Error('The group abbreviation is longer than the specified length');
  }

  // ES: Comprobamos si el nombre del grupo es solo numeros
  if (program.maxGroupAbbreviationIsOnlyNumbers && !/^[0-9]+$/.test(data.abbreviation))
    throw new Error('The group abbreviation must be only numbers');

  // ES: Comprobamos que no exista ya el grupo
  const groupCount = await table.groups.count(
    {
      abbreviation: data.abbreviation,
      program: data.program,
      type: 'group',
    },
    { transacting }
  );

  if (groupCount) throw new Error('The group already exists');
}

const updateCourseSchema = {
  type: 'object',
  properties: {
    id: stringSchema,
    name: stringSchema,
    abbreviation: stringSchema,
  },
  required: ['id', 'name', 'abbreviation'],
  additionalProperties: false,
};
async function validateUpdateCourse(data, { transacting } = {}) {
  const validator = new LeemonsValidator(updateCourseSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const course = await table.groups.findOne({ id: data.id }, { transacting });
  if (!course) {
    throw new Error('The course does not exist');
  }

  // ES: Comprobamos que no exista ya el curso
  const groupCount = await table.groups.count(
    {
      id_$ne: data.id,
      abbreviation: data.abbreviation,
      program: course.program,
      type: 'course',
    },
    { transacting }
  );

  if (groupCount) throw new Error('The course already exists');
}

const updateGroupSchema = {
  type: 'object',
  properties: {
    id: stringSchema,
    name: stringSchema,
    abbreviation: stringSchema,
  },
  required: ['id', 'name', 'abbreviation'],
  additionalProperties: false,
};
async function validateUpdateGroup(data, { transacting } = {}) {
  const validator = new LeemonsValidator(updateGroupSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }

  const group = await table.groups.findOne({ id: data.id }, { transacting });
  if (!group) {
    throw new Error('The group does not exist');
  }

  // ES: Comprobamos que no exista ya el curso
  const groupCount = await table.groups.count(
    {
      id_$ne: data.id,
      abbreviation: data.abbreviation,
      program: group.program,
      type: 'group',
    },
    { transacting }
  );

  if (groupCount) throw new Error('The group already exists');
}

const addSubjectSchema = {
  type: 'object',
  properties: {
    name: stringSchema,
    program: stringSchema,
  },
  required: ['name', 'program'],
  additionalProperties: false,
};
async function validateAddSubject(data, { transacting } = {}) {
  const { course: _course, ..._data } = data;
  const validator = new LeemonsValidator(addSubjectSchema);

  if (!validator.validate(_data)) {
    throw validator.error;
  }

  // ES: Comprobamos si el programa tiene o puede tener cursos asignados
  const needCourse = await subjectNeedCourseForAdd(data.program, { transacting });

  // ES: Si tiene/puede comprobamos si dentro de los datos nos llega a que curso va dirigida la nueva asignatura
  if (needCourse) {
    if (!data.course) throw new Error('The course is required');
    const course = await table.groups.findOne({ id: data.course, type: 'course' }, { transacting });
    if (!course) throw new Error('The course does not exist');
  }
  // ES: Si no tiene/puede comprobamos que no nos llega a que curso va dirigida la nueva asignatura
  else if (data.course) {
    throw new Error('The course is not required');
  }
}

const updateSubjectSchema = {
  type: 'object',
  properties: {
    id: stringSchema,
    name: stringSchema,
  },
  required: ['id', 'name'],
  additionalProperties: false,
};
async function validateUpdateSubject(data, { transacting } = {}) {
  const validator = new LeemonsValidator(updateSubjectSchema);

  if (!validator.validate(data)) {
    throw validator.error;
  }
}

module.exports = {
  validateAddGroup,
  validateAddCourse,
  validateAddSubject,
  validateAddProgram,
  validateUpdateGroup,
  validateUpdateCourse,
  validateAddKnowledge,
  validateUpdateSubject,
  validateAddSubjectType,
  validateSubstagesFormat,
  validateUpdateSubjectType,
};
