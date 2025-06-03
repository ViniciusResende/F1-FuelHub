/**
 * @category Utility Class
 * @module LocalStorage
 */

/**
 * Class that helps interactions with web client Local Storage.
 */
export class LocalStorage {
  #localStorage: Storage | null;

  constructor() {
    this.#localStorage =
      typeof window !== 'undefined' ? window.localStorage : null;
  }

  setLocalStorage(localStorage: Storage) {
    this.#localStorage = localStorage;
  }

  getLocalStorageItem(key: string): string | null {
    if (!this.#localStorage) this.setLocalStorage(window.localStorage);
    return this.#localStorage?.getItem(key) ?? null;
  }

  setLocalStorageItem(key: string, item: string) {
    if (!this.#localStorage) this.setLocalStorage(window.localStorage);
    this.#localStorage?.setItem(key, item);
  }

  removeLocalStorageItem(key: string) {
    if (!this.#localStorage) this.setLocalStorage(window.localStorage);
    this.#localStorage?.removeItem(key);
  }
}
