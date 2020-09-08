import { once } from '..';
import { StrictEventEmitter } from 'strict-event-emitter-types';
import { TestEvents } from './event-records';
import { EventEmitter2 } from 'eventemitter2';

describe('eventemitter2 lib', () => {
  let emitter: StrictEventEmitter<EventEmitter2, TestEvents>;

  beforeEach(() => {
    emitter = new EventEmitter2();
  })
  
  test('single arg', async () => {
    const oncePromise = once(emitter, 'eventSingleArg');
    emitter.emit('eventSingleArg', 'hi');
    const result = await oncePromise;
    expect(result).toEqual(['hi']);
  });

  test('multi arg', async () => {
    const oncePromise = once(emitter, 'eventMultiArg');
    emitter.emit('eventMultiArg', 'hello', 1234);
    const result = await oncePromise;
    expect(result).toEqual(['hello', 1234]);
  });

  test('empty args', async () => {
    const oncePromise = once(emitter, 'emptyEvent');
    emitter.emit('emptyEvent');
    const result = await oncePromise;
    expect(result).toEqual([]);
  });

  test('filter', async () => {
    const oncePromise = once(emitter, 'eventMultiArg', (...e) => e[1] === 5555);
    emitter.emit('eventMultiArg', 'hello', 1234);
    emitter.emit('eventMultiArg', 'hello', 5555);
    emitter.emit('eventMultiArg', 'hello', 1111);
    const result = await oncePromise;
    expect(result).toEqual(['hello', 5555]);
  });
});
