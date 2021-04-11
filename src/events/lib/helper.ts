/* eslint-disable @typescript-eslint/no-redeclare */
/**
 * 辅助语法糖方法
 * 帮助减小包体积
 */

import { IContext } from './types';

interface IDefConfig {
  [key: string]: Function;
}

interface IProcessHelperConfig {
  interrupt?: boolean;
}

/**
 * @function mapData
 * @description 减写中台化ctx.watch([key], callback)
 * @param keys
 * @param ctx 执行对象
 * @param ctxBind 映射对象，挂载注销方法
 * @example
 * mapData(['a'], ctx, ctxBind) =>
 * ctx.watch('a', (val) => { ctxBind.a = val; })
 * mapData({a: fn}, ctx, ctxBind); unmapActions(ctxBind); =>
 * const rm = ctx.watch('a', (val) => { ctxBind.a = fn(val); }); rm();
 */
export const mapData = (keys: string[] | IDefConfig, ctx: IContext, ctxBind: any) => {
  if (!keys) {
    return [];
  }
  if (!ctxBind._$unmapFns) {
    ctxBind._$unmapFns = [] as Function[];
  }
  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      // ctxBind为外部上下文
      ctxBind._$unmapFns.push(
        ctx.watch(key, (val: any) => {
          ctxBind[key] = val;
        }),
      );
    });
  } else {
    Object.keys(keys).forEach((key) => {
      ctxBind._$unmapFns.push(
        ctx.watch(key, (val: any) => {
          ctxBind[key] = keys[key](val);
        }),
      );
    });
  }
  return ctxBind._$unmapFns;
};

/**
 * @function mapEvent
 * @description 减写中台化ctx.event.listen([key], callback)
 * @param options
 * @param ctx
 * @param ctxBind 映射对象，挂载注销方法
 * @example
 * mapEvent({a: fn}, ctx, ctxBind); unmapActions(ctxBind) =>
 * const rm = ctx.event.listen('a', fn); rm();
 * 
 */
export const mapEvent = (options: IDefConfig, ctx: IContext, ctxBind: any) => {
  if (!ctxBind._$unmapFns) {
    ctxBind._$unmapFns = [] as Function[];
  }
  Object.keys(options).forEach((key) => {
    const fn = options[key];
    if (fn instanceof Function) {
      ctx.event.listen(key, fn);
      ctxBind._$unmapFns.push(
        () => {
          ctx.event.remove(key, fn);
        },
      );
    }
  });
  return ctxBind._$unmapFns;
};

/**
 * @function mapProcess
 * @description 减写中台化ctx.event.define([key], callback)
 * @param options
 * @param ctx
 * @param ctxBind 映射对象，挂载注销方法
 * @example
 * mapProcess({a: fn}, ctx, ctxBind); =>
 * ctx.process.define('a', fn);
 * 
 */
export const mapProcess = (options: IDefConfig, ctx: IContext) => {
  Object.keys(options).forEach((key) => {
    const fn = options[key];
    if (fn instanceof Function) {
      ctx.process.define(key, fn);
    }
  });
};

/**
 * @function runProcess
 * @description 依次串行执行数组中的process，并使用promise连接
 * @param options
 * @param ctx
 * @param ctxBind 映射对象，挂载注销方法
 * @returns stopFn 中断函数，终止process串执行
 * @example
 * runProcess(['a', 'b'], ctx, stop); =>
 * ctx.process.invoke('a').then((val) => { ctx.process.invoke('b', val); })
 * stop.interrupt = true; // 中断流程
 */
export const runProcess = (keys: string[], ctx: IContext, options: IProcessHelperConfig = {}) => {
  let promise = Promise.resolve();
  keys.forEach((key: string) => {
    promise = promise.then((val: any) => {
      if (options && options.interrupt) {
        return Promise.reject('process manually interrupted');
      }
      const result = ctx.process.invoke(key, val);
      if (result instanceof Promise) {
        return result;
      }
      return Promise.resolve(result);
    })
  });
  return promise;
}

/**
 * @function unmapActions
 * @description 减写中台化ctx.watch ctx.event.listen 的垃圾回收
 * @param ctxBind mapData/mapListener所绑定的对象/adapter映射对象
 * @example
 * unmapActions(ctxBind)
 */
export const unmapActions = (ctxBind: any) => {
  if (!ctxBind || !ctxBind._$unmapFns) {
    return;
  }
  while (ctxBind._$unmapFns.length > 0) {
    const unmapFn = ctxBind._$unmapFns.pop();
    unmapFn && unmapFn();
  }
};
