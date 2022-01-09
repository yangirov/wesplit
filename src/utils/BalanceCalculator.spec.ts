import { getEventBalance, getEventsMembersDebts } from './BalanceCalculator';
import { EventDto } from '../models/Event';
import * as moment from 'moment';

describe('Balance calculation repayment debts test', function () {
  let event!: EventDto;

  beforeEach(() => {
    event = {
      ownerUserId: '111',
      id: '111',
      name: 'Test',
      organizer: 'Emil',
      date: 111,
      purchases: [
        {
          title: 'Test',
          payer: 'Emil',
          sum: 1000,
          members: ['Emil', 'Ivan', 'Mark', 'Sam'],
          date: 1,
        },
        {
          title: 'Test',
          payer: 'Mark',
          sum: 1500,
          members: ['Emil', 'Ivan', 'Mark', 'Sam'],
          date: 1,
        },
      ],
      members: ['Emil', 'Ivan', 'Mark', 'Sam'],
      rePayedDebts: [],
    };
  });

  it('should get balance for two purchases', () => {
    // Act
    const balance = getEventBalance(event);
    const eventDebts = getEventsMembersDebts(balance, event);

    // Assert
    expect(balance).toEqual([
      { name: 'Emil', sum: 375 },
      { name: 'Ivan', sum: -625 },
      { name: 'Mark', sum: 875 },
      { name: 'Sam', sum: -625 },
    ]);

    expect(eventDebts).toEqual([
      { from: 'Ivan', to: 'Emil', sum: -375 },
      { from: 'Ivan', to: 'Mark', sum: -250 },
      { from: 'Sam', to: 'Mark', sum: -625 },
    ]);
  });

  it('should get repayment debts for two purchases', () => {
    // Arrange
    event.rePayedDebts = [
      {
        name: 'Ivan',
        sum: 375,
      },
      {
        name: 'Emil',
        sum: -375,
      },
    ];

    // Act
    const balance = getEventBalance(event);
    const eventDebts = getEventsMembersDebts(balance, event);

    // Assert
    expect(balance).toEqual([
      { name: 'Emil', sum: 0 },
      { name: 'Ivan', sum: -250 },
      { name: 'Mark', sum: 875 },
      { name: 'Sam', sum: -625 },
    ]);

    expect(eventDebts).toEqual([
      { from: 'Ivan', to: 'Mark', sum: -250 },
      { from: 'Sam', to: 'Mark', sum: -625 },
    ]);
  });
});

describe('Balance calculation functions test', function () {
  let defaultEvent!: EventDto;

  beforeEach(() => {
    defaultEvent = {
      ownerUserId: '111',
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
  });

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
      ownerUserId: '111',
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
      ownerUserId: '111',
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
