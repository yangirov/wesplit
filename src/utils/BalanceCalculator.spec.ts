import { getEventBalance, getEventsMembersDebts } from './BalanceCalculator';
import { EventDto } from '../models/Event';
import * as moment from 'moment';

let defaultEvent: EventDto = {
  id: '111',
  name: 'Beer party',
  organizer: 'Emil',
  date: moment.utc().startOf('day').valueOf(),
  purchases: [
    {
      title: 'Beer',
      payer: 'Ivan',
      sum: 200,
      members: ['Emil', 'Ivan'],
      date: 1,
    },
    {
      title: 'Burgers',
      payer: 'Emil',
      sum: 500,
      members: ['Emil', 'Ivan'],
      date: 1,
    },
  ],
  members: ['Emil', 'Ivan', 'Fedor'],
  rePayedDebts: [],
};

describe('Balance lite functions test', function () {
  it('should get balance for two peoples', () => {
    const result = getEventBalance(defaultEvent);

    expect(result).toEqual([
      { name: 'Emil', sum: 150 },
      { name: 'Ivan', sum: -150 },
    ]);
  });

  it('should get balance for two peoples with re-payed debts', () => {
    // Arrange
    const event: EventDto = {
      ...defaultEvent,
      rePayedDebts: [{ name: 'Ivan', sum: 150 }],
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual([
      { name: 'Emil', sum: 150 },
      { name: 'Ivan', sum: 0 },
    ]);
  });

  it('should get balance for event without purchases', () => {
    // Arrange
    const event: EventDto = {
      ...defaultEvent,
      purchases: [],
      rePayedDebts: [],
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual([]);
  });

  it('should get balance for two peoples with re-payed debts', () => {
    // Arrange
    const event: EventDto = {
      ...defaultEvent,
      rePayedDebts: [{ name: 'Ivan', sum: 150 }],
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual([
      { name: 'Emil', sum: 150 },
      { name: 'Ivan', sum: 0 },
    ]);
  });

  it('should get balance for five peoples with debts', () => {
    // Arrange
    const event: EventDto = {
      id: '111',
      name: 'Beer party',
      organizer: 'Emil',
      date: moment.utc().startOf('day').valueOf(),
      purchases: [
        {
          title: 'Beer',
          payer: 'Emil',
          sum: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
        {
          title: 'Burgers',
          payer: 'Fedor',
          sum: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
        {
          title: 'Rental house',
          payer: 'Mark',
          sum: 5000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
      ],
      members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
      rePayedDebts: [],
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual([
      { name: 'Emil', sum: -400 },
      { name: 'Ivan', sum: -1400 },
      { name: 'Fedor', sum: -400 },
      { name: 'Artem', sum: -1400 },
      { name: 'Mark', sum: 3600 },
    ]);
  });

  it('should get balance for five peoples with re-payed debts', () => {
    // Arrange
    const event: EventDto = {
      id: '111',
      name: 'Beer party',
      organizer: 'Emil',
      date: moment.utc().startOf('day').valueOf(),
      purchases: [
        {
          title: 'Beer',
          payer: 'Emil',
          sum: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
        {
          title: 'Burgers',
          payer: 'Fedor',
          sum: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
        {
          title: 'Rental house',
          payer: 'Mark',
          sum: 5000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
          date: 1,
        },
      ],
      members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
      rePayedDebts: [
        { name: 'Emil', sum: 400 },
        { name: 'Fedor', sum: 400 },
      ],
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual([
      { name: 'Emil', sum: 0 },
      { name: 'Ivan', sum: -1401 },
      { name: 'Fedor', sum: 0 },
      { name: 'Artem', sum: -1401 },
      { name: 'Mark', sum: 3600 },
    ]);
  });

  it('should show that Ivan debt Emil 150', () => {
    const eventBalance = getEventBalance(defaultEvent);

    // Act
    const result = getEventsMembersDebts(eventBalance, defaultEvent);

    // Assert
    expect(result).toEqual([
      {
        from: 'Ivan',
        to: 'Emil',
        sum: -150,
      },
    ]);
  });
});
