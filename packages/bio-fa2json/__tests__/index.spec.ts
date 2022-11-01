import path from 'path';
import fs from 'fs';
import fa2json from '../src';

describe('api.basic', () => {
  test('muli lines: fa', () => {
    const content = fs.readFileSync(path.join(__dirname, './fixtures/multi.fa'),'utf-8').toString();
    const res1 = fa2json(content, { stringify: true });
    const res2 = fa2json(content, { stringify: false });
    expect(res1.length).toBe(3);
    expect(typeof res1[0].value).toBe('string');
    expect(typeof res2[0].value).toBe('object');
  });

  test('single fasta: fa', () => {
    const content = fs.readFileSync(path.join(__dirname, './fixtures/single.fa'),'utf-8').toString();
    const res1 = fa2json(content, { stringify: true });
    const res2 = fa2json(content);
    expect(res1.length).toBe(1);
    expect(typeof res1[0].value).toBe('string');
    expect(typeof res2[0].value).toBe('object');
  });

});
