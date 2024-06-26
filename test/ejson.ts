import test from 'ava';
import fs from 'node:fs';
import { Ejson } from '../src/index.js';

const data = {
  title: 'EJSON Document',
  number: 100.1,
  boolean: true,
  date: new Date(2000, 1, 1),
  array: [ 'tag1', 'tag2' ],
  obj: { key1: 'value1', key2: 'value2' },
  objArray: [
    { key1: 'value1', key2: 'value2' },
    { key1: 'value1', key2: 'value2' }
  ]
};

test('parse sample file', t => {
  const raw = fs.readFileSync(new URL('./fixtures/data.ejson', import.meta.url)).toString();
  const parser = new Ejson();

  const fromDisk = parser.parse(raw);
  const stringified = parser.stringify(data)

  t.deepEqual(fromDisk, data);
  t.is(raw, stringified);
});

test.failing('buffer roundtrip', t => {
  const parser = new Ejson();

  const b = Buffer.from('Test string');
  const r = parser.parse(parser.stringify(b));

  t.deepEqual(b, r);
})