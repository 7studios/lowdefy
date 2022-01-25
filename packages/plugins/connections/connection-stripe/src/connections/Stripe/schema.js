export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Lowdefy Connection Schema - Stripe',
  type: 'object',
  required: ['secretKey'],
  properties: {
    secretKey: {
      type: 'string',
      description: 'Stripe secret key.',
      errorMessage: {
        type: 'Stripe connection property "secretKey" should be a string.',
      },
    },
    apiVersion: {
      type: 'string',
      description: 'Stripe API version to use.',
      default: null,
      errorMessage: {
        type: 'Stripe connection property "apiVersion" should be a string.',
      },
    },
    telemetry: {
      type: 'boolean',
      description: 'Allow Stripe to send latency telemetry.',
      default: true,
      errorMessage: {
        type: 'Stripe connection property "telemetry" should be a boolean.',
      },
    },
    timeout: {
      type: 'integer',
      description: 'Maximum time each request can take in ms.',
      default: 80000,
      errorMessage: {
        type: 'Stripe connection property "timeout" should be an integer.',
      },
    },
    maxNetworkRetries: {
      type: 'integer',
      description: 'The amount of times a request should be retried.',
      default: 0,
      errorMessage: {
        type: 'Stripe connection property "maxNetworkRetries" should be an integer.',
      },
    },
  },
  errorMessage: {
    type: 'Stripe connection properties should be an object.',
    required: {
      secretKey: 'Stripe connection should have required property "secretKey".',
    },
  },
};
