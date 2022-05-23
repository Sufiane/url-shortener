import { isValidUrl } from './utils';

describe('index', () => {
  describe('isValidUrl()', () => {
    test('it should return false when the url is not a valid url', () => {
      expect(isValidUrl('toto')).toBe(false);
    });
    test('it should return true when the url is a valid url', () => {
      expect(isValidUrl('http://google.com')).toBe(true);
    });
  })
})
