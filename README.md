# strict-event-emitter-once
[![NPM Package](https://img.shields.io/npm/v/strict-event-emitter-once.svg?style=flat-square)](https://www.npmjs.org/package/strict-event-emitter-once)
[![Build Status](https://github.com/zone117x/strict-event-emitter-once/workflows/Build/badge.svg)](https://github.com/zone117x/strict-event-emitter-once/actions)

A typed implementation of [Node.js `events.once(emitter, name)`](https://nodejs.org/api/events.html#events_events_once_emitter_name) for use with [`strict-event-emitter-types`](https://www.npmjs.com/package/strict-event-emitter-types).

Creates a Promise that is fulfilled when the EventEmitter emits the given event.

### Example usage

```ts
import { once } from 'strict-event-emitter-once';

// setup typed event emitter
import { StrictEventEmitter } from 'strict-event-emitter-types';
import { EventEmitter } from 'events';

// define your events
interface Events {
  request: (request: Request, response: Response) => void;
  done: void;
}

// create strict event emitter types
const ee: StrictEventEmitter<EventEmitter, Events> = new EventEmitter;

// await for an event
const [request, response] = await once(ee, 'request');

// await for an event that matches criteria
const [request, response] = await once(ee, 'request', (req, res) => {
  return req.url === '/';
});

```

## LICENSE [MIT](LICENSE)
