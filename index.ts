/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictEventEmitter, EEMethodReturnType } from 'strict-event-emitter-types';

type ListenerType<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];

/**
 * A typed version of the Node.js `events.once(emitter, name)` function.
 * @param emitter - An instance of `StrictEventEmitter`.
 * @param event - The string/symbol of the event name.
 * @param predicate - An optional filter, otherwise the first event arg is returned.
 */
export function once<TEmitter, TEventRecord, P extends keyof TEventRecord>(
  emitter: StrictEventEmitter<TEmitter, TEventRecord> & {
    addListener<P extends keyof TEventRecord, T>(
      this: T,
      event: P,
      listener: (...args: ListenerType<TEventRecord[P]>) => void
    ): EEMethodReturnType<TEmitter, 'addListener', T>;
    removeListener<P extends keyof TEventRecord, T>(
      this: T,
      event: P,
      listener: (...args: any[]) => any
    ): EEMethodReturnType<TEmitter, 'removeListener', T>;
  },
  event: P,
  predicate?: (...value: ListenerType<TEventRecord[P]>) => boolean
): Promise<ListenerType<TEventRecord[P]>> {
  return new Promise(resolve => {
    const eventHandler = (...args: ListenerType<TEventRecord[P]>) => {
      if (predicate && !predicate(...args)) {
        return;
      }
      emitter.removeListener(event, eventHandler);
      resolve(args);
    };
    emitter.addListener(event, eventHandler);
  });
}

export default once;
