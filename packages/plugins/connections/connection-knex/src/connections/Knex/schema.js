export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Connection Schema - Knex',
  type: 'object',
  required: ['client', 'connection'],
  properties: {
    client: {
      type: 'string',
      description: 'SQL query string.',
      errorMessage: {
        type: 'Knex connection property "client" should be a string.',
      },
    },
    connection: {
      type: ['string', 'object'],
      description: 'SQL query string.',
      errorMessage: {
        type: 'Knex connection property "connection" should be a string or object.',
      },
    },
    searchPath: {
      type: 'string',
      description: 'Set PostgreSQL search path.',
      errorMessage: {
        type: 'Knex connection property "searchPath" should be a string.',
      },
    },
    version: {
      type: 'string',
      description: 'Set database version.',
      errorMessage: {
        type: 'Knex connection property "version" should be a string.',
      },
    },
  },
  errorMessage: {
    type: 'Knex connection properties should be an object.',
    required: {
      client: 'Knex connection should have required property "client".',
      connection: 'Knex connection should have required property "connection".',
    },
  },
};
