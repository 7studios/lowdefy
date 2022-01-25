export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Request Schema - StripeRequest',
  type: 'object',
  patternProperties: {
    '.+': {
      description: 'Stripe API resource',
      type: 'object',
      minProperties: 1,
      maxProperties: 1,
      errorMessage: {
        type: 'StripeRequest resource should be an object.',
        minProperties: 'StripeRequest resource should contain a method to call.',
        maxProperties: 'StripeRequest resource should contain only a single method to call.',
        oneOf:
          'StripeRequest resource should only contain a method to call, or sub-resource with a method to call.',
      },
      oneOf: [
        {
          description: 'Stripe API method to call on the resource',
          patternProperties: {
            '.+': {
              description: 'Parameters to pass to the resource method, if any',
              type: ['array', 'null'],
              errorMessage: {
                type: 'Should be an array of parameters or null.',
              },
            },
          },
        },
        {
          description: 'Stripe API sub-resource of the parent resource',
          patternProperties: {
            '.+': {
              description: 'Stripe API method to call on the resource',
              type: 'object',
              minProperties: 1,
              maxProperties: 1,
              patternProperties: {
                '.+': {
                  description: 'Parameters to pass to the sub-resource method, if any',
                  type: ['array', 'null'],
                },
              },
            },
          },
        },
      ],
    },
  },
  minProperties: 1,
  maxProperties: 1,
  errorMessage: {
    type: 'StripeRequest request properties should be an object.',
    additionalProperties: 'StripeRequest should contain a valid resource to call.',
    minProperties: 'StripeRequest should contain a resource to call.',
    maxProperties: 'StripeRequest should contain only a single resource to call.',
  },
};
