
import isObject from 'lodash/isObject';

export function set(key, value) {
  if (isObject(value)) {
    value = JSON.stringify(value);
  }

  localStorage.setItem(key, value);
}

export function get(key, defaultValue = undefined) {
  const result = localStorage.getItem(key);
  if (result === undefined) {
    return defaultValue;
  }
  return result;
}