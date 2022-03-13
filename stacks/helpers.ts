import { App } from '@serverless-stack/resources';

/**
 * Whether or not this is in a production environment
 * @param app The app configuration
 */
export const isProd = (app: App): boolean => {
  return app.stage === 'prod';
};
