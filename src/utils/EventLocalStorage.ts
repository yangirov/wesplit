import { EventDto, LocalEvent } from '../models/Event';

export function getLocalEvents(): LocalEvent[] {
  try {
    return <LocalEvent[]>JSON.parse(localStorage.getItem('localEvents') || '[]');
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }

  return [];
}

export function setLocalEvents(events: EventDto[]) {
  const newLocalEvents = events.map(({ id, organizer }) => ({ id, organizer }));

  localStorage.setItem('localEvents', JSON.stringify(newLocalEvents));

  return newLocalEvents;
}

export function setOrganizerToLocalEvent(id: string, organizer: string) {
  const newLocalEventToSave: LocalEvent = { id, organizer };

  let oldLocalEvents = getLocalEvents();
  if (oldLocalEvents.some(x => x.id === id)) {
    oldLocalEvents = oldLocalEvents.filter(x => x.id !== id);
  }

  const newLocalEvents = [...oldLocalEvents, newLocalEventToSave];

  localStorage.setItem('localEvents', JSON.stringify(newLocalEvents));

  return newLocalEvents;
}
