import Logger from './Logger';


class Process {


  // 未定义process，可以把参数存入任务队列

  constructor (options) {
    this.processors = new Map();
    this._options = options;
    this._processArgsQueue = {};
  }

  /**
   * 定义事件
   * @param {string} key 事件名称
   * @param {Function} handler 调用事件执行的函数
   */

  define (key, handler) {
    if (!key || !handler || !handler.apply) {
      /* istanbul ignore next */
      if (this._options.debug) {
        Logger.info('ranta-adapter: process: 缺少 key 或者 handler');
      }
      return;
    }

    const processor = this.processors.get(key);

    if (processor) {
      /* istanbul ignore next */
      if (this._options.debug) {
        Logger.info(`ranta-adapter: process: ${key} 已经被定义，请勿重复定义`);
      }
      return;
    }

    this.processors.set(key, {
      key,
      handler,
    });

    /**
     * 补发未响应的 process invoke
     */
    if (this._processArgsQueue[key]) {
      while (this._processArgsQueue[key].length > 0) {
        const task = this._processArgsQueue[key].pop();
        task && this.invoke(key, ...task.args);
      }
      delete this._processArgsQueue[key];
    }
  }

  /**
   * 执行事件，获取值
   * @param {string} key 事件名称
   * @param  {any[]} args 多个参数
   */
  invoke (key, ...args) {
    const processor = this.processors.get(key);

    if (!processor) {
      if (!this._processArgsQueue[key]) {
        this._processArgsQueue[key] = [];
      }
      this._processArgsQueue[key].push({ args });
      return;
    }

    return processor.handler.apply(null, args);
  }
}

export default Process;
