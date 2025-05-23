/**
 * @category Utility Service
 * @module Logging
 */

/** Interfaces */
import { IClass } from '../../../data/interfaces/CommonInterfaces';

/** Classes */
import { Bridge } from '../../classes/bridge/Bridge';
import { AbstractLogging } from './AbstractLogging';
import { LoggingDefaultImplementation } from './LoggingDefaultImplementation';

/** Enums */
import { LogLevelEnum } from './LoggingEnums';

/**
 * Service to handle logging.
 *
 * @remarks Provides a bridge to an external implementation.
 */
export class Logging extends Bridge<AbstractLogging> {
  #disabled: boolean;
  #disabledLevels: Set<LogLevelEnum>;

  readonly LOG_LEVEL = LogLevelEnum;

  constructor() {
    super(AbstractLogging as IClass<AbstractLogging>);
    this.#disabled = false;
    this.#disabledLevels = new Set();
    this.setImplementation(new LoggingDefaultImplementation());
  }

  /**
   * Disables logging completely.
   */
  disable(): void {
    this.#disabled = true;
  }

  /**
   * Enables the logging.
   */
  enable(): void {
    this.#disabled = false;
  }

  /**
   * Disables a specific logging level.
   *
   * @param logLevel - Log level to be disabled
   */
  disableLevel(logLevel: LogLevelEnum): void {
    this.#disabledLevels.add(logLevel);
  }

  /**
   * Enables a specific logging level.
   *
   * @param logLevel - Log level to be disabled
   */
  enableLevel(logLevel: LogLevelEnum): void {
    this.#disabledLevels.delete(logLevel);
  }

  /**
   * Logs the provided arguments if default log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  log(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.LOG)) {
      return this.implementation.log(...params);
    }
  }

  /**
   * Logs the provided arguments if informational log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  info(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.INFO)) {
      return this.implementation.info(...params);
    }
  }

  /**
   * Logs the provided arguments if warning log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  warn(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.WARN)) {
      return this.implementation.warn(...params);
    }
  }

  /**
   * Logs the provided arguments if error log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  error(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.ERROR)) {
      return this.implementation.error(...params);
    }
  }

  /**
   * Logs the provided arguments if debugging log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  debug(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.DEBUG)) {
      return this.implementation.debug(...params);
    }
  }

  /**
   * Logs the provided arguments if tracing log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  trace(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.TRACE)) {
      return this.implementation.trace(...params);
    }
  }
}
