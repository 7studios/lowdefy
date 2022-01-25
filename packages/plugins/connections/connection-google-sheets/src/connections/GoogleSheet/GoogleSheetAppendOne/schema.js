export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - GoogleSheetAppendOne',
  type: 'object',
  required: ['row'],
  properties: {
    row: {
      type: 'object',
      description:
        'The row to insert into the sheet. An object where keys are the column names and values are the values to insert.',
      errorMessage: {
        type: 'GoogleSheetAppendOne request property "row" should be an object.',
      },
    },
    options: {
      type: 'object',
      properties: {
        raw: {
          type: 'boolean',
          description: 'Store raw values instead of converting as if typed into the sheets UI.',
          errorMessage: {
            type: 'GoogleSheetAppendOne request property "options.raw" should be a boolean.',
          },
        },
      },
    },
  },
  errorMessage: {
    type: 'GoogleSheetAppendOne request properties should be an object.',
    required: {
      row: 'GoogleSheetAppendOne request should have required property "row".',
    },
  },
};
