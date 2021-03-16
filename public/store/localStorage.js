
import { set as setStorage, get as getStorage } from '../utils/localStorage.js';

export function getKeyName(keyName) {
  return `vuex.${keyName}`;
}

/**
 * 
 * @param {string} moduleName 
 * @param {*} vuex
 * @param {*} mutation 
 * @param {*} state Global state of vuex
 */
export function storeStateOnMutate(moduleName, vuex, mutation, state) {
  setStorage(getKeyName(moduleName), JSON.stringify(state[moduleName]));
}

/**
 * Returns a function that will store state in local storage with given module name
 * @param {string} moduleName 
 */
export function getStoreStateOnMutate(moduleName) {
  return (vuex, mutation, state) => storeStateOnMutate(moduleName, vuex, mutation, state);
}

/**
 * 
 * @param {string} moduleName 
 * @param {*} vuex
 * @param {*} state Global state of vuex
 */
export function restoreState(moduleName, vuex, state) {
  vuex.replaceState(Object.assign(state, { [moduleName]: JSON.parse(getStorage(getKeyName(moduleName))) }));
}

/**
 * Returns a function that restore the state based on the value stored in local storage
 * @param {string} moduleName 
 */
export function getRestoreState (moduleName) {
  return (vuex, state) => restoreState(moduleName, vuex, state);
}