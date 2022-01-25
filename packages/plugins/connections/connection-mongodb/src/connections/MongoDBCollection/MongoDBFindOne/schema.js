export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBFindOne',
  type: 'object',
  required: ['query'],
  properties: {
    query: {
      type: 'object',
      description: 'A MongoDB query object',
      errorMessage: {
        type: 'MongoDBFindOne request property "query" should be an object.',
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBFindOne request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBFindOne request properties should be an object.',
    required: 'MongoDBFindOne request should have required property "query".',
  },
};
