import { getLocalEvents, setLocalEvents } from './localStorage.service';

export interface LocalStorage {
  [key: string]: any;
}

let localStore: LocalStorage = {};

beforeEach(() => {
  spyOn(localStorage, 'getItem').and.callFake((key) =>
    key in localStore ? localStore[key] : null
  );

  spyOn(localStorage, 'setItem').and.callFake(
    (key, value) => (localStore[key] = value + '')
  );

  spyOn(localStorage, 'clear').and.callFake(() => (localStore = {}));
});

describe('Local storage events test', function () {
  it('should save event correctly', () => {
    // Arrange
    const id = 'test-id';
    const organizer = 'Emil';

    // Act
    const newEvents = setLocalEvents(id, organizer);
    const events = getLocalEvents();

    // Assert
    expect(newEvents).toEqual(events);
    expect(events[0].id).toEqual('test-id');
    expect(events[0].organizer).toEqual('Emil');
  });
});
