export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBDeleteMany',
  type: 'object',
  required: ['filter'],
  properties: {
    filter: {
      type: 'object',
      description: 'The filter used to select the document to update.',
      errorMessage: {
        type: 'MongoDBDeleteMany request property "filter" should be an object.',
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBDeleteMany request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBDeleteMany request properties should be an object.',
    required: 'MongoDBDeleteMany request should have required property "filter".',
  },
};
