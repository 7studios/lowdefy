export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBDeleteOne',
  type: 'object',
  required: ['filter'],
  properties: {
    filter: {
      type: 'object',
      description: 'The filter used to select the document to update.',
      errorMessage: {
        type: 'MongoDBDeleteOne request property "filter" should be an object.',
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBDeleteOne request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBDeleteOne request properties should be an object.',
    required: 'MongoDBDeleteOne request should have required property "filter".',
  },
};
