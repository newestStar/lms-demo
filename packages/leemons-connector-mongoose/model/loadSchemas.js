const createSchema = require('./createSchema');

function loadSchemas(ctx, schemas) {
  const Schemas = schemas.map(createSchema).map((schema) => [schema.name, schema.schema]);

  ctx.schemas = new Map([...ctx.schemas, ...Schemas]);
  return Schemas;
}

module.exports = loadSchemas;
