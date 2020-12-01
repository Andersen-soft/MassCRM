export class EventEmitter {
  public _events?: any;

  constructor() {
    this._events = {};
  }

  removeListener(name: string, listenerToRemove: Function) {
    if (!this._events[name]) {
      throw new Error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }
    const filterListeners = (listener: any) => listener !== listenerToRemove;
    this._events[name] = this._events[name].filter(filterListeners);
  }

  on(name: string, listener: Function) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(listener);
  }

  off(name: string, listener: Function) {
    return this.removeListener(name, listener);
  }

  once(name: string, listener: Function) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    const onceWrapper = (data: any) => {
      listener(data);
      this.off(name, listener);
    };
    this._events[name].push(onceWrapper);
    return this;
  }

  emit(name: string, data: any) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }
    const fireCallbacks = (callback: Function) => {
      callback(data);
    };
    return this._events[name].forEach(fireCallbacks);
  }
}
