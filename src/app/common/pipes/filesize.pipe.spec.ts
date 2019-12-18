import { FilesizePipe } from './filesize.pipe';

describe('FilesizePipe', () => {
  const pipe = new FilesizePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same value (default unit is °K) if no scale', () => {
    expect(pipe.transform(12345)).toBe('12.06kb');
  });
});
