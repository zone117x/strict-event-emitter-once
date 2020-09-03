export interface TestEvents {
  eventMultiArg: (arg1: string, arg2: number) => void;
  eventSingleArg: (arg: string) => void;
  emptyEvent: void;
}
