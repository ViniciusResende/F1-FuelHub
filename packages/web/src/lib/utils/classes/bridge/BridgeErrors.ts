/**
 * @category Utility Class
 * @module Bridge
 */

/**
 * Class which extends the base Error and can be identified as a specific error
 * related to bridge implementation.
 */
export class BridgeImplementationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BridgeImplementationError';
  }
}
