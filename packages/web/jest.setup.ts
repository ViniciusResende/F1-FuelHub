/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */

import '@testing-library/jest-dom';

/** Adds missing fetch implementations to jest globals */
import 'whatwg-fetch';

/** Utilities */
import { Utilities } from '@/lib/utils/Utilities';

/**
 * Utility services' implementation
 */
beforeAll(() => {
  const AbstractLogging = Utilities.logging.abstractClass;
  class LoggingImplementation extends AbstractLogging {
    log() {}
    info() {}
    warn() {}
    error() {}
    debug() {}
    trace() {}
  }
  Utilities.logging.setImplementation(new LoggingImplementation());
});

/**
 * Fetch API mocking helper
 */
const scope: any = {
  global,
};
scope.global.fetch = jest.fn();
scope.global.mockFetch = (status: number, data?: any, wait = 0) => {
  const response = {
    status,
    ok: status < 400,
    json: () => Promise.resolve(data),
  };
  scope.global.fetch.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, wait);
    });
  });
};
