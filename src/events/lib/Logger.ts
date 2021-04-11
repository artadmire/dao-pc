type ILogLevel = 'info' | 'warn' | 'error';

class Logger {
  info(...args: any[]) {
    this.callNative('info', args);
  }

  warn(...args: any[]) {
    this.callNative('warn', args);
  }

  /* istanbul ignore next */
  error(...args: any[]) {
    this.callNative('error', args);
  }

  /* istanbul ignore next */
  assert(bool: boolean, message: any) {
    if (bool) {
      this.error(message);
    }
  }

  callNative(level: ILogLevel, ...args: any[]) {
    console[level](...args);
  }
}

export default new Logger();
