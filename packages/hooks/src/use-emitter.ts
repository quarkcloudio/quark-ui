import { useCallback, useEffect } from 'react';

type EventParams = any[];

type EventFn = (...args: EventParams) => void;

type EventBus = {
  emit(event: string, ...args: EventParams): void;
  off(event: string, fn: EventFn): void;
  on(event: string, fn: EventFn): void;
};

class Emitter implements EventBus {
  private _events = new Map<string, EventFn[]>();

  private _prevEvents = new Map<string, EventParams[]>();

  emit(event: string, ...args: EventParams) {
    const fns = this._events.get(event);

    const allFns = this._events.get('*');

    if (allFns) {
      fns?.forEach(fn => fn(...args));
    }

    if (fns) {
      fns.forEach(fn => fn(...args));
    } else {
      if (!this._prevEvents.has(event)) {
        this._prevEvents.set(event, []);
      }

      this._prevEvents.get(event)?.push(args);
    }
  }

  off(event: string, fn: EventFn) {
    const fns = this._events.get(event);
    if (fns) {
      if (fns.length === 1) {
        this._events.delete(event);
      } else {
        this._events.set(
          event,
          fns.filter(f => f !== fn)
        );
      }
    }
  }
  on(event: string, fn: EventFn) {
    const fns = this._events.get(event);
    if (fns) {
      fns.push(fn);
    } else {
      this._events.set(event, [fn]);
    }

    if (this._prevEvents.has(event)) {
      this._prevEvents.get(event)?.forEach(args => fn(...args));
      this._prevEvents.delete(event);
    }
  }

  offAll() {
    this._events.clear();
    this._prevEvents.clear();
  }
}

export const emitter = new Emitter();

export function useEmit() {
  return (event: string, ...args: EventParams) => emitter.emit(event, ...args);
}

export function useOn(event: string, fn: EventFn) {
  const stableFn = useCallback(fn, [fn]);

  useEffect(() => {
    emitter.on(event, stableFn);
    return () => emitter.off(event, stableFn);
  }, [event, stableFn]);
}
