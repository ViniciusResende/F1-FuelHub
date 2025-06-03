/**
 * @category Interface
 * @module CommonInterfaces
 */

/** Enums */
import { LibNotificationTypeEnum } from '../enums/CommonEnums';

/**
 * Class interface to be used as type.
 */
export interface IClass<T> {
  new (...args: unknown[]): T;
}

/**
 * General configuration for the library.
 */
export interface ILibConfiguration {
  baseApiUrl?: string;
}

/**
 * General configuration for the library.
 */
export interface ILibConfiguration {
  apiConfigObject?: unknown;
  notificationService?: LibNotificationTypeEnum;
}

/**
 * General Error  Payload body.
 */
export interface ILibGeneralErrorPayload {
  errorCode: number;
  errorMessage: string;
}
