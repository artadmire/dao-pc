// import { IContext } from './types';

// interface IEvent {
//   // 事件编号
//   id: number;
//   // 是否只执行一次
//   once: boolean;
//   ctx: IContext;
//   callback: Function;
// }

class Event {
  // private _eventMap: Map<string, IEvent[]>;
  // private _id: number;

  constructor () {
    this._eventMap = new Map();
    this._id = 0;
  }

  /**
   * 添加事件监听
   * @param {string} name 事件名称
   * @param {function} callback 事件回调
   * @param {this} ctx 回调函数调用上下文
   * @returns {function} 取消事件监听函数
   */

  listen (name, callback, ctx) {
    return this.createEvent(
      {
        name,
        callback,
        once: false,
      },
      ctx,
    );
  }

  /**
   * 删除事件监听
   * @param {string} name 事件名称
   * @param {function} callback 监听的事件回调引用
   */
  remove (name, callback) {
    if (!callback) {
      this._eventMap.delete(name);
    } else {
      const events = this._eventMap.get(name);
      if (events) {
        this._removeEventByFn(events, callback);
      }
    }
  }

  /**
   * 添加一次性事件监听
   * @param {string} name 事件名称
   * @param {function} callback 事件回调
   * @param {this} ctx 回调函数调用上下文
   * @returns {function} 取消事件监听函数
   */
  once (name, callback, ctx) {
    return this.createEvent(
      {
        name,
        callback,
        once: true,
      },
      ctx,
    );
  }

  /**
   * 派发事件
   *
   * @param {string} name 事件名称
   * @param  {any[]} args 其他参数
   */
  emit (name, ...args) {
    const events = this._eventMap.get(name);

    if (!events) {
      return this;
    }

    events.forEach((event) => {
      const { id, callback, once, ctx } = event;
      callback && callback.apply(ctx, args);
      if (once) {
        this._removeEventById(events, id);
      }
    });

    return this;
  }

  createEvent (options, ctx) {
    const { name, callback, once } = options;
    const events = this._eventMap.get(name) || [];
    const eventId = ++this._id;

    events.push({
      id: eventId,
      once,
      callback,
      ctx,
    });

    this._eventMap.set(name, events);

    // 返回一个函数，可以移除该事件
    return () => {
      /* istanbul ignore else */
      if (events) {
        this._removeEventById(events, eventId);
      }
    };
  }

  _removeEventById (events, id) {
    for (let i = 0; i < events.length; i++) {
      const item = events[i];
      if (item.id === id) {
        events.splice(i, 1);
        break;
      }
    }
  }

  _removeEventByFn (events, callback) {
    for (let i = 0; i < events.length; i++) {
      const item = events[i];
      if (item.callback === callback) {
        events.splice(i, 1);
        break;
      }
    }
  }
}

export default Event;
