import path from 'path';
import fa2json from '../src';

describe('api.basic', () => {
  test('muli lines: fa', () => {
    const res1 = fa2json(path.join(__dirname, './fixtures/multi.fa'), { stringify: true });
    const res2 = fa2json(path.join(__dirname, './fixtures/multi.fa'), { stringify: false });
    expect(res1.length).toBe(3);
    expect(typeof res1[0].value).toBe('string');
    expect(typeof res2[0].value).toBe('object');
  });

  test('single fasta: fa', () => {
    const res1 = fa2json(path.join(__dirname, './fixtures/single.fa'), { stringify: true });
    const res2 = fa2json(path.join(__dirname, './fixtures/single.fa'));
    expect(res1.length).toBe(1);
    expect(typeof res1[0].value).toBe('string');
    expect(typeof res2[0].value).toBe('object');
  });

});
