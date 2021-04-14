import Logger from './Logger';

class Watcher {

  constructor () {
    this.watchers = new Map();
    this.__notifyTimes = {};
    this._id = 0;
  }

  /**
   * @param {string} key 监听字段名
   * @param {function} callback 监听回调函数
   * @param {this} context
   * @returns {function} 取消监听函数
   */

  watch (key, callback, ctx) {
    if (!key || !callback) {
      Logger.info('ranta-adapter: watch: 缺少 watch name 或者 回调函数 callback');
      return;
    }

    // watch的时候，值已经被设置过
    if (this.__notifyTimes[key] > 0) {
      callback.call(ctx, ctx.data[key]);
    }

    const handlerId = ++this._id;

    // 已经有人watch过了
    const watcher = this.watchers.get(key) || {
      key,
      unWatch: /* istanbul ignore next */ () => {
        this._unWatchAll(key);
      },
      noticeHandler: new Map(),
    };
    watcher.noticeHandler.set(handlerId, {
      id: handlerId,
      handler: callback,
    });
    this.watchers.set(key, watcher);
    return this._unWatch(key, handlerId);
  }

  /* istanbul ignore next */
  unWatch (key) {
    this._unWatchAll(key);
  }

  _unWatch (key, id) {
    return () => {
      const watcher = this.watchers.get(key);
      /* istanbul ignore else */
      if (watcher) {
        watcher.noticeHandler.delete(id);
      }
    };
  }

  // 中台化没有改方法
  /* istanbul ignore next */
  _unWatchAll (key) {
    const watcher = this.watchers.get(key);
    if (watcher) {
      watcher.noticeHandler.clear();
      watcher.unWatch = () => {};
      this.watchers.set(key, watcher);
    }
    this.watchers.delete(key);
  }

  notify (key, args, ctx) {
    // 标记数据已被执行次数
    if (this.__notifyTimes[key] === undefined) {
      this.__notifyTimes[key] = 1;
    } else {
      this.__notifyTimes[key] += 1;
    }
    const watcher = this.watchers.get(key);
    if (!watcher) {
      return;
    }
    watcher.noticeHandler.forEach((handlerObj) => {
      const { handler } = handlerObj;
      handler.apply(ctx, args);
    });
  }
}

export default Watcher;
