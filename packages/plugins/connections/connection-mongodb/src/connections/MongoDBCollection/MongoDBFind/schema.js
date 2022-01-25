export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBFind',
  type: 'object',
  required: ['query'],
  properties: {
    query: {
      type: 'object',
      description: 'A MongoDB query object',
      errorMessage: {
        type: 'MongoDBFind request property "query" should be an object.',
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBFind request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBFind request properties should be an object.',
    required: 'MongoDBFind request should have required property "query".',
  },
};
