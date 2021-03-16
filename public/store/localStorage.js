
import { set as setStorage, get as getStorage } from '../utils/localStorage.js';

export function storeStateOnMutate(keyName, mutation, state) {
  setStorage(`vuex.${keyName}`, JSON.stringify(state[keyName]));
}

export function getStoreStateOnMutate(keyName) {
  return (mutation, state) => storeStateOnMutate(keyName, mutation, state);
}

export function restoreState(keyName, state) {
  this.replaceState(Object.assign(state, { [keyName]: JSON.parse(getStorage(`vuex.${keyName}`)) }));
}

export function getRestoreState (keyName) {
  return function (state) { restoreState.bind(this)(keyName, state); }
}