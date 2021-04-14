
class Logger {
  info (...args) {
    this.callNative('info', args);
  }

  warn (...args) {
    this.callNative('warn', args);
  }

  /* istanbul ignore next */
  error (...args) {
    this.callNative('error', args);
  }

  /* istanbul ignore next */
  assert (bool, message) {
    if (bool) {
      this.error(message);
    }
  }

  callNative (level, ...args) {
    // eslint-disable-next-line no-console
    console[level](...args);
  }
}

export default new Logger();
