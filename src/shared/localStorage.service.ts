import { LocalEvent } from '../models/Event';

export function getLocalEvents(): LocalEvent[] {
  try {
    return <LocalEvent[]>(
      JSON.parse(localStorage.getItem('localEvents') || '[]')
    );
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }

  return [];
}

export function setLocalEvents(id: string, organizer: string) {
  const newLocalEventToSave: LocalEvent = { id, organizer };

  const oldLocalEvents = <LocalEvent[]>(
    JSON.parse(localStorage.getItem('localEvents') || '[]')
  );

  const newLocalEvents = [...oldLocalEvents, newLocalEventToSave];
  localStorage.setItem('localEvents', JSON.stringify(newLocalEvents));

  return newLocalEvents;
}
