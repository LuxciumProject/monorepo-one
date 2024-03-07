import { from } from '../../scan-dirs';

describe('Name of the group', () => {
  it('should Test the project', () => {
    expect(from('./').addValidExt('.jpeg').hasExt('.jpeg')).toBeTruthy();
  });
});
