import { getEventBalance, getEventsMembersDebts } from './BalanceCalculator';
import { Event } from '../models/Event';

let defaultEvent: Event = {
  id: '111',
  name: 'Beer party',
  organizer: 'Emil',
  date: '2020-01-01 11:00',
  purchases: [
    {
      id: '1',
      name: 'Beer',
      payer: 'Ivan',
      amount: 200,
      members: ['Emil', 'Ivan'],
    },
    {
      id: '2',
      name: 'Burgers',
      payer: 'Emil',
      amount: 500,
      members: ['Emil', 'Ivan'],
    },
  ],
  members: ['Emil', 'Ivan'],
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
    const event: Event = {
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
    const event: Event = {
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
    const event: Event = {
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
    const event: Event = {
      id: '111',
      name: 'Beer party',
      organizer: 'Emil',
      date: '2020-01-01 11:00',
      purchases: [
        {
          id: '1',
          name: 'Beer',
          payer: 'Emil',
          amount: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        {
          id: '3',
          name: 'Burgers',
          payer: 'Fedor',
          amount: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        {
          id: '3',
          name: 'Rental house',
          payer: 'Mark',
          amount: 5000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
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
    const event: Event = {
      id: '111',
      name: 'Beer party',
      organizer: 'Emil',
      date: '2020-01-01 11:00',
      purchases: [
        {
          id: '3',
          name: 'Beer',
          payer: 'Emil',
          amount: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        {
          id: '3',
          name: 'Burgers',
          payer: 'Fedor',
          amount: 1000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        {
          id: '3',
          name: 'Rental house',
          payer: 'Mark',
          amount: 5000,
          members: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
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
