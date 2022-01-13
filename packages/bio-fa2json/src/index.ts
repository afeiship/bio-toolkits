import fs from 'fs';

const defaults = {
  charset: 'utf8',
  stringify: false
};

class Processor {
  private readonly content;
  private readonly lines;
  private readonly cache;
  private readonly result;
  private readonly options;

  constructor(filename, options?) {
    this.options = { ...defaults, options };
    this.content = fs.readFileSync(filename, this.options.charset).toString();
    this.lines = this.content.split('\n');
    this.cache = [];
    this.result = [];
  }

  start() {
    this.lines.forEach((line) => {
      if (line.trim()) {
        if (line.includes('>')) {
          const res = this.process();
          if (res) this.result.push(res);
        }
        this.cache.push(line);
      }
    });

    return this.result;
  }

  process() {
    if (!this.cache.length) return null;
    const items = this.cache.slice();
    const children = items.slice(1);
    this.cache.length = 0;
    return {
      title: items[0],
      children: this.options.stringify ? children.join('') : children
    };
  }
}


export default (filename, options?) => {
  const processor = new Processor(filename, options);
  return processor.start();
}
