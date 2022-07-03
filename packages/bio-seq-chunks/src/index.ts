import nxChunk from '@jswork/next-chunk';

interface SeqChunkSInput {
  chunkSize: number;
  lineCount: number;
}

interface SeqChunkSOutput {
  head: number[];
  tail: number[];
  body: string[];
}

const defaults: SeqChunkSInput = {
  lineCount: 60,
  chunkSize: 10,
};

export default (inSeq: string, inOptions?: SeqChunkSInput): SeqChunkSOutput => {
  const { lineCount, chunkSize } = { ...defaults, ...inOptions };
  const res: SeqChunkSOutput = {
    head: [],
    body: [],
    tail: [],
  };

  for (let i = 0; i < inSeq.length; i += lineCount) {
    const idxHead = i + 1;
    const idx_tail = i + lineCount;
    const str = inSeq.slice(i, i + lineCount);
    if (idxHead % lineCount === 1) {
      res.head.push(idxHead);
    }

    if (idx_tail % lineCount === 0) {
      res.tail.push(idx_tail);
    }

    res.body.push(nxChunk(str, chunkSize));
  }

  return res;
};
