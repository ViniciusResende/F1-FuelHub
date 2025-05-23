/**
 * @category Utility Class
 * @module Bridge
 */

/** Interfaces */
import { IClass } from '../../../data/interfaces/CommonInterfaces';

/** Errors */
import { BridgeImplementationError } from './BridgeErrors';

/**
 * Class which bridges external implementation for a specific abstract class.
 * Will throw error when implementation is missing and access is performed.
 */
export class Bridge<Type> {
  #currentImplementation: Type | null;
  #abstractClassDefinition: IClass<Type>;

  constructor(abstractClass: IClass<Type>) {
    this.#abstractClassDefinition = abstractClass;
    this.#currentImplementation = null;
  }

  /**
   * Returns the abstract class that will be bridged.
   *
   * @sealed
   * @returns Class type for the bridge implementation
   */
  get abstractClass(): IClass<Type> {
    return this.#abstractClassDefinition;
  }

  /**
   * Returns the implementation class' instance which extended the abstract
   * class and was defined by the `setImplementation` method.
   *
   * @sealed
   * @returns Implementation class instance
   */
  get implementation(): Type {
    if (!this.#currentImplementation) {
      const name: string = this.#abstractClassDefinition.name;
      throw new BridgeImplementationError(
        `Missing bridge implementation for abstract class "${name}"`
      );
    }

    return this.#currentImplementation;
  }

  /**
   * Sets the implementation class' instance that will be used by the bridge.
   *
   * @sealed
   * @param implementation - Implementation class' instance
   */
  setImplementation(implementation: Type): void {
    if (!(implementation instanceof this.abstractClass)) {
      const { name } = this.#abstractClassDefinition;
      throw new BridgeImplementationError(
        `Bridge implementation does not extend abstract class "${name}"`
      );
    }

    this.#currentImplementation = implementation;
  }
}
