import { LocalEvents, Events } from '../models/Event';

export function getLocalEvents(): Events {
  try {
    return <Events>JSON.parse(localStorage.getItem('localEvents') || '{}');
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }

  return {};
}

export function setLocalEvents(id: string, name: string) {
  const newLocalEventToSave: LocalEvents = {};
  newLocalEventToSave[id] = name;

  const oldLocalEvents = JSON.parse(
    localStorage.getItem('localEvents') || '{}'
  );

  const newLocalEvents = Object.assign(oldLocalEvents, newLocalEventToSave);
  localStorage.setItem('localEvents', JSON.stringify(newLocalEvents));

  return newLocalEvents;
}
