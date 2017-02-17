/* global localStorage */
import identity from 'lodash/identity';
import debouce from 'lodash/debounce';

const DEBOUNCE_TIME = 1000;

const storeInLocalStorage = debouce((key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
}, DEBOUNCE_TIME, { maxWait: DEBOUNCE_TIME });

function existsKeyInStorage(key) {
  return !!localStorage.getItem(key);
}

function getFromStorage(key, deserialize) {
  const rawContent = localStorage.getItem(key);
  return deserialize(JSON.parse(rawContent));
}

class LocalStore {
  constructor(options) {
    this.serialize = options.serialize || identity;
    this.deserialize = options.deserialize || identity;
    this.key = options.key || 'localStore';
  }

  middleware() {
    return (store) => (next) => (action) => {
      const result = next(action);
      const plainState = this.serialize(store.getState());
      storeInLocalStorage(this.key, plainState);
      return result;
    };
  }

  hasStoredState() {
    return existsKeyInStorage(this.key);
  }

  storedState() {
    return getFromStorage(this.key, this.deserialize);
  }
}

function createLocalStore(options) {
  return new LocalStore(options);
}

export { createLocalStore };
