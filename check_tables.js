const Database = require('./node_modules/better-sqlite3');
const path = require('path');
const db = new Database(path.join(process.cwd(), 'dev.db'));
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', JSON.stringify(tables));
db.close();
