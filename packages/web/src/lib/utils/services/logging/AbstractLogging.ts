/**
 * @category Utility Service
 * @module Logging
 */

/**
 * Abstract method signatures for Logging service.
 * Those methods should be implemented externally by the bridge.
 */
export abstract class AbstractLogging {
  /**
   * Default logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract log(...params: unknown[]): void;

  /**
   * Informational logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract info(...params: unknown[]): void;

  /**
   * Warning logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract warn(...params: unknown[]): void;

  /**
   * Error logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract error(...params: unknown[]): void;

  /**
   * Debugging logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract debug(...params: unknown[]): void;

  /**
   * Tracing logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract trace(...params: unknown[]): void;
}
