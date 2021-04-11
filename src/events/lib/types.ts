export interface IProcess {
  define: (key: string, handler: Function) => void;
  invoke: (key: string, ...args: any[]) => Function;
}

export interface IEvent {
  listen: (name: string, callback: Function, ctx?: IContext) => void;
  emit: (name: string, ...args: any[]) => void;
  once: (name: string, ...args: any[]) => void;
  remove: (name: string, callback?: Function) => void;
}

export interface IWatchOptions {
  immediate?: boolean;
}

export interface IWatcherIns {
  watch: (key: string | number, callback: Function, ctx: IContext) => void;
  // unWatch: (key: string | number) => void;
  notify: (key: string | number, args: any[], ctx: IContext) => void;
}

export interface IPureObject {
  [key: string]: any;
}

export interface IContext {
  data: IPureObject;
  event: IEvent;
  process: IProcess;
  watch: (key: string, callback: Function) => any;
  query: IPureObject;
}

export interface IExtension {
  name: string;
  event?: {
    listen?: string[];
    emit?: string[];
  };
  data?: {
    [key: string]: number;
  };
  process?: {
    define?: IPureObject;
    invoke?: IPureObject;
  };
}

export interface IInnerOptions {
  debug?: boolean;
}

export interface IOptions extends IInnerOptions {
  extensions: {
    [key: string]: IPureObject;
  };
}
