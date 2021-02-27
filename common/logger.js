
function time() { return new Date().toISOString(); }

function appendTime(args) {
  return [time(), ...args];
}

class Logger {
  /**
   * @param {string} name 
   * @param {boolean} verbose
   */
  constructor(name, verbose) {
    this.name = name;
    this.verbose = verbose;
  }

  appendTag(args) {
    return [`[${this.name}]`, ...args];
  }

  debug = (...args) => {
    if (!this.verbose) return;

    args = this.appendTag(args);
    args = appendTime(args);

    console.debug(...args)
  }

  info = (...args) => {
    args = this.appendTag(args);
    args = appendTime(args);

    console.log(...args)
  }

  error = (...args) => {
    args = this.appendTag(args);
    args = appendTime(args);

    console.error(...args);
  }
}

/**
 * 
 * @param {string} loggerName 
 * @param {verbose} verbose 
 */
function newLogger(loggerName, verbose) {
  return new Logger(loggerName, verbose);
}

export default newLogger;