
export const alphabet = "23456789qwertyupasdfghkzxcvbnmQWERTYUPASDFGHJKLZXCVNM";

const alphabetLength = alphabet.length;

/**
 * Get random generated string with given length.
 * @param {number} length
 */
export function getRandomString(length = 5) {
  return Array.from({ length }).map(_ => alphabet[Math.floor(Math.random() * alphabetLength)]).join('');
}