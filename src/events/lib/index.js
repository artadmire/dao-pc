import Event from './event';
import Process from './process';
import Watcher from './watcher';
import Logger from './Logger';


export default class RantaAdapter {


  constructor (options) {
    // 初始化
    this.ctx = {
      data: {},
      event: new Event(),
      process: new Process(options),
      watch () {},
      query: {},
    }
    this.init(options);
  }

  init (options) {
    // 依据配置补全ctx
    this._initOptions(options);
    this._initWatchData();
    this._initProxyData();
  }

  getCtx () {
    return this.ctx;
  }

  bindCtx (page, query) {
    // if (!this.ctx && page) {
    // }
    this.ctx.query = {
      ...this.ctx.query,
      ...query,
    };
    page.ctx = this.ctx;
  }

  _initOptions (options) {
    // 把多个extension组合起来，生成name为key的对象
    const extensions = options.extensions.reduce((data, current) => {
      data[current.name] = current;
      return data;
    }, {});
    this._options = {
      extensions,
      debug: options.debug,
    };
    this._extensionData = Object.values(extensions).reduce((data, current) => {
      if (!current.data) {
        return data;
      }
      Object.keys(current.data).forEach((key) => {
        data[key] = undefined;
      });

      return data;
    }, {});
  }

  _initProxyData () {
    const { ctx, _watchers: watchers } = this;
    this.ctx.data = new Proxy(this._extensionData, {
      set (target, propKey, value, receiver) {
        const oldValue = target[propKey];
        watchers.notify(propKey, [value, oldValue], ctx);
        return Reflect.set(target, propKey, value, receiver);
      },
      get (target, propKey, receiver) {
        return Reflect.get(target, propKey, receiver);
      },
    });
  }

  _initWatchData () {
    const watcher = new Watcher();
    this._watchers = watcher;
    this.ctx.watch = (key, callback) => {
      if (!(key in this._extensionData)) {
        /* istanbul ignore next */
        if (this._options.debug) {
          Logger.warn(`ranta-adapter: watch-data ${key} not in extensions ...`);
        }
        return () => {};
      }
      return watcher.watch(key, callback, this.ctx);
    };
  }
}

export * from './helper';
