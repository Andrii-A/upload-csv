import { mapDate } from './helpers';

describe('Helpers', () => {

  it(`should format date of birth for chart labels`, () => {
    expect(mapDate('12/16/2019')).toEqual('2019-12-16');
  });

});
