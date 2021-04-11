import { IContext } from './types';

interface IEvent {
  // 事件编号
  id: number;
  // 是否只执行一次
  once: boolean;
  ctx: IContext;
  callback: Function;
}

class Event {
  private _eventMap: Map<string, IEvent[]>;
  private _id: number;

  constructor() {
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

  listen(name: string, callback: Function, ctx?: IContext) {
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
  remove(name: string, callback?: Function) {
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
  once(name: string, callback: Function, ctx?: IContext) {
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
  emit(name: string, ...args: any[]) {
    const events = this._eventMap.get(name);

    if (!events) {
      return this;
    }

    events.forEach((event: IEvent) => {
      const { id, callback, once, ctx } = event;
      callback && callback.apply(ctx, args);
      if (once) {
        this._removeEventById(events, id);
      }
    });

    return this;
  }

  createEvent(options: { name: string; callback: Function; once?: boolean }, ctx?: IContext) {
    const { name, callback, once } = options;
    const events = this._eventMap.get(name) || [];
    const eventId = ++this._id;

    events.push({
      id: eventId,
      once,
      callback,
      ctx,
    } as IEvent);

    this._eventMap.set(name, events);

    // 返回一个函数，可以移除该事件
    return () => {
      /* istanbul ignore else */
      if (events) {
        this._removeEventById(events, eventId);
      }
    };
  }

  _removeEventById(events: IEvent[], id: number) {
    for (let i = 0; i < events.length; i++) {
      const item = events[i];
      if (item.id === id) {
        events.splice(i, 1);
        break;
      }
    }
  }

  _removeEventByFn(events: IEvent[], callback: Function) {
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
