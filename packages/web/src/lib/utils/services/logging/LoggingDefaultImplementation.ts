/**
 * @category Utility Service
 * @module Logging
 */

/** Types */
import { AbstractLogging } from './AbstractLogging';

/**
 * Default implementation class for Logging.
 * This class makes use of the generic console API.
 */
export class LoggingDefaultImplementation extends AbstractLogging {
  /**
   * Default logging level.
   *
   * @param params - Arguments to be logged
   */
  log(...params: unknown[]) {
    console.log(...params);
  }

  /**
   * Informational logging level.
   *
   * @param params - Arguments to be logged
   */
  info(...params: unknown[]) {
    console.info(...params);
  }

  /**
   * Warning logging level.
   *
   * @param params - Arguments to be logged
   */
  warn(...params: unknown[]) {
    console.warn(...params);
  }

  /**
   * Error logging level.
   *
   * @param params - Arguments to be logged
   */
  error(...params: unknown[]) {
    console.error(...params);
  }

  /**
   * Debugging logging level.
   *
   * @param params - Arguments to be logged
   */
  debug(...params: unknown[]) {
    console.debug(...params);
  }

  /**
   * Tracing logging level.
   *
   * @param params - Arguments to be logged
   */
  trace(...params: unknown[]) {
    // nosemgrep
    console.trace(...params);
  }
}
