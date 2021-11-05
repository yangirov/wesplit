import { getEventBalance, getEventsParticipantsDebts } from './Balance';
import { Event } from '../models/Event';

let defaultEvent: Event = {
  id: '111',
  purchases: {
    '1': {
      id: '1',
      name: 'Beer',
      payer: 'Ivan',
      amount: 200,
      participants: ['Emil', 'Ivan'],
    },
    '2': {
      id: '2',
      name: 'Burgers',
      payer: 'Emil',
      amount: 500,
      participants: ['Emil', 'Ivan'],
    },
  },
  participants: ['Emil', 'Ivan'],
  rePayedDebts: {},
};

describe('Balance functions test', function () {
  it('should get balance for two peoples', () => {
    const result = getEventBalance(defaultEvent);

    expect(result).toEqual({
      Ivan: -150,
      Emil: 150,
    });
  });

  it('should get balance for two peoples with re-payed debts', () => {
    // Arrange
    const event: Event = { ...defaultEvent, rePayedDebts: { Ivan: 150 } };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual({
      Ivan: 0,
      Emil: 150,
    });
  });

  it('should get balance for two peoples with re-payed debts', () => {
    // Arrange
    const event: Event = {
      ...defaultEvent,
      rePayedDebts: {
        Ivan: 150,
      },
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual({
      Ivan: 0,
      Emil: 150,
    });
  });

  it('should get balance for five peoples with debts', () => {
    // Arrange
    const event: Event = {
      id: '111',
      purchases: {
        '1': {
          id: '1',
          name: 'Beer',
          payer: 'Emil',
          amount: 1000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        '2': {
          id: '3',
          name: 'Burgers',
          payer: 'Fedor',
          amount: 1000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        '3': {
          id: '3',
          name: 'Rental house',
          payer: 'Mark',
          amount: 5000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
      },
      participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
      rePayedDebts: {},
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual({
      Emil: -400,
      Ivan: -1400,
      Fedor: -400,
      Artem: -1400,
      Mark: 3600,
    });
  });

  it('should get balance for five peoples with re-payed debts', () => {
    // Arrange
    const event: Event = {
      id: '111',
      purchases: {
        '1': {
          id: '3',
          name: 'Beer',
          payer: 'Emil',
          amount: 1000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        '2': {
          id: '3',
          name: 'Burgers',
          payer: 'Fedor',
          amount: 1000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
        '3': {
          id: '3',
          name: 'Rental house',
          payer: 'Mark',
          amount: 5000,
          participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
        },
      },
      participants: ['Emil', 'Ivan', 'Fedor', 'Artem', 'Mark'],
      rePayedDebts: {
        Emil: 400,
        Fedor: 400,
      },
    };

    // Act
    const result = getEventBalance(event);

    // Assert
    expect(result).toEqual({
      Emil: 0,
      Ivan: -1401,
      Fedor: 0,
      Artem: -1401,
      Mark: 3600,
    });
  });

  it('should show that Ivan debt Emil 150', () => {
    const participantBalance = getEventBalance(defaultEvent);

    // Act
    const result = getEventsParticipantsDebts(participantBalance, defaultEvent);
    console.log(result);

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
