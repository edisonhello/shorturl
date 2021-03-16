
import { set as setStorage, get as getStorage } from '../utils/localStorage.js';

export function getKeyName(keyName) {
  return `vuex.${keyName}`;
}

/**
 * 
 * @param {string} moduleName 
 * @param {*} mutation 
 * @param {*} state Global state of vuex
 */
export function storeStateOnMutate(moduleName, mutation, state) {
  setStorage(getKeyName(moduleName), JSON.stringify(state[moduleName]));
}

/**
 * Returns a function that will store state in local storage with given module name
 * @param {string} moduleName 
 */
export function getStoreStateOnMutate(moduleName) {
  return (mutation, state) => storeStateOnMutate(moduleName, mutation, state);
}

/**
 * 
 * @param {string} moduleName 
 * @param {*} state Global state of vuex
 */
export function restoreState(moduleName, state) {
  this.replaceState(Object.assign(state, { [moduleName]: JSON.parse(getStorage(getKeyName(moduleName))) }));
}

/**
 * Returns a function that restore the state based on the value stored in local storage
 * @param {string} moduleName 
 */
export function getRestoreState (moduleName) {
  return function (state) { restoreState.bind(this)(moduleName, state); }
}