import sumFormat from './Formatters';

describe('Sum format test', function () {
  it('should format correctly', () => {
    const testCases = [
      { value: 11, expected: '11' },
      { value: 111, expected: '111' },
      { value: 1111, expected: '1 111' },
      { value: 11111, expected: '11 111' },
      { value: 11111111, expected: '11 111 111' },
      { value: 11111111111, expected: '11 111 111 111' },
    ];

    testCases.forEach(({ value, expected }) => {
      const actual = sumFormat(value)
        .replace(/\xa0/g, ' ')
        .replace(/\u202f/g, ' ');

      expect(actual).toEqual(expected);
    });
  });
});
