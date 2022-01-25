export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBInsertMany',
  type: 'object',
  required: ['docs'],
  properties: {
    docs: {
      type: 'array',
      description: 'The array of documents to be inserted.',
      errorMessage: {
        type: 'MongoDBInsertMany request property "docs" should be an array.',
      },
      items: {
        type: 'object',
        errorMessage: {
          type: 'MongoDBInsertMany request property "docs" should be an array of documents to insert.',
        },
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBInsertMany request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBInsertMany request properties should be an object.',
    required: 'MongoDBInsertMany request should have required property "docs".',
  },
};
