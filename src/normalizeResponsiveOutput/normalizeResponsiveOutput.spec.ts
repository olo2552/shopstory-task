import {normalizeResponsiveOutput} from "./normalizeResponsiveOutput";

describe('normalizeResponsiveOutput', () => {
  it('should not interrupt scalars', () => {
    // todo extend for scalars
    expect(normalizeResponsiveOutput(10)).toBe(10);
    expect(normalizeResponsiveOutput(false)).toBe(false);
    expect(normalizeResponsiveOutput('a')).toBe('a');
  });

  it('should unpack boxed scalars', () => {
    expect(normalizeResponsiveOutput([10])).toBe(10);
    expect(normalizeResponsiveOutput([false])).toBe(false);
    expect(normalizeResponsiveOutput(['a'])).toBe('a');

  });

  it('should strip repetitive values', () => {
    expect(normalizeResponsiveOutput(['a', 'a', 'b'])).toStrictEqual([null, 'a', 'b']);
    expect(normalizeResponsiveOutput(['a', 'a', 'b', 'b'])).toStrictEqual([null, 'a', 'b']);
    expect(normalizeResponsiveOutput(['a', 'a', 'a', 'b'])).toStrictEqual([null, null, 'a', 'b']);
    expect(normalizeResponsiveOutput(['a', 'a', 'b', 'b', 'c'])).toStrictEqual([null, 'a', null, 'b', 'c']);
  });

  it('should strip redundant nulls into scalar', () => {
    expect(normalizeResponsiveOutput([null, null, 10])).toBe(10);
    expect(normalizeResponsiveOutput([null, null, null, 10])).toBe(10);
    expect(normalizeResponsiveOutput([null, null, 10, null])).toBe(10);
  })

  it('should strip redundant values from last breakpoint', () => {
    expect(normalizeResponsiveOutput([20, 30, 10, 10, 10])).toStrictEqual([20, 30, 10]);
  })
});
