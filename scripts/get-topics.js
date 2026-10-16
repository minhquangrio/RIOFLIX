const fs = require('fs');

const text = fs.readFileSync('./src/lib/onflix-home-data.ts', 'utf8');

const regex = /"title":\s*"([^"]+)",\s*"viewAllUrl":\s*"([^"]+)"/g;
let match;
const topics = [];

while ((match = regex.exec(text)) !== null) {
  const title = match[1].replace(/\r?\n\s*/g, ' ').trim();
  const url = match[2];
  const slug = url.replace('/chu-de/', '');
  topics.push({ title, url, slug });
}

console.log(`Extracted ${topics.length} topics:`);
console.log(JSON.stringify(topics, null, 2));
