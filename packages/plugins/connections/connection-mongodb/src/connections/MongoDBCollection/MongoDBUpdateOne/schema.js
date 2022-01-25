export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - MongoDBUpdateOne',
  type: 'object',
  required: ['filter', 'update'],
  properties: {
    filter: {
      type: 'object',
      description: 'The filter used to select the document to update.',
      errorMessage: {
        type: 'MongoDBUpdateOne request property "filter" should be an object.',
      },
    },
    update: {
      type: ['object', 'array'],
      description: 'The update operations to be applied to the document.',
      errorMessage: {
        type: 'MongoDBUpdateOne request property "update" should be an object.',
      },
    },
    options: {
      type: 'object',
      description: 'Optional settings.',
      errorMessage: {
        type: 'MongoDBUpdateOne request property "options" should be an object.',
      },
    },
  },
  errorMessage: {
    type: 'MongoDBUpdateOne request properties should be an object.',
    required: {
      filter: 'MongoDBUpdateOne request should have required property "filter".',
      update: 'MongoDBUpdateOne request should have required property "update".',
    },
  },
};
