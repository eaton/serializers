import test from 'ava';
import fs from 'node:fs';
import { Json } from '../src/index.js';

const data = {
  "title": "JSON Document",
  "number": 100.1,
  "boolean": true,
  "date": "2024/01/01",
  "array": ["tag1", "tag2"],
  "obj": {
    "key1": "value1",
    "key2": "value2"
  },
  "objArray": [
    { "key1": "value1", "key2": "value2" },
    { "key1": "value1", "key2": "value2" }
  ]
};

test('parse sample file', t => {
  const raw = fs.readFileSync(new URL('./fixtures/data.json', import.meta.url)).toString();

  const fromDisk = Json.parse(raw);
  const stringified = Json.stringify(data)

  t.deepEqual(fromDisk, data);
});