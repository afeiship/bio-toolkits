import path from 'path';
import fa2json from '../src';

describe('api.basic', () => {
  test('normail single value case', () => {
    const res = fa2json(path.join(__dirname, './fixtures/multi.fa'), { stringify: true });
    console.log(res);
  });
});
