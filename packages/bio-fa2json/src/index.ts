import fs from 'fs';

interface Options {
  encoding?: any;
  stringify?: boolean;
}

const defaults: Options = {
  encoding: 'utf8',
  stringify: false
};

class Processor {
  private readonly content;
  private readonly lines;
  private readonly cache;
  private readonly result;
  private readonly options: Options;

  constructor(inFilename, inOptions?) {
    this.options = { ...defaults, ...inOptions };
    this.content = fs.readFileSync(inFilename, this.options.encoding).toString();
    this.lines = this.content.split('\n');
    this.cache = [];
    this.result = [];
  }

  start() {
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i].trim();
      if (!line) continue;
      if (line.includes('>')) this.check();
      this.cache.push(line);
    }
    this.check();
    return this.result;
  }

  check() {
    const res = this.process();
    if (res) this.result.push(res);
  }


  process() {
    if (!this.cache.length) return null;
    const items = this.cache.slice();
    const children = items.slice(1);
    this.cache.length = 0;

    return {
      name: items[0],
      value: this.options.stringify ? children.join('') : children
    };
  }
}


export default (inFilename, inOptions?) => {
  const processor = new Processor(inFilename, inOptions);
  return processor.start();
}
