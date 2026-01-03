// test.js
import { db } from './config/db.js';

const result = await db.execute('select 1');
console.log(result);
