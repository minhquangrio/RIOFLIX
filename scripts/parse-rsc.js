const fs = require('fs');

const html = fs.readFileSync('./docs/research/chu-de.html', 'utf8');

const regex = /self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)/g;
let match;
let fullPayload = "";

while ((match = regex.exec(html)) !== null) {
  let raw = match[1];
  // Unescape quotes and slashes
  try {
    const unescaped = JSON.parse(`"${raw}"`);
    fullPayload += unescaped + "\n---CHUNK---\n";
  } catch (e) {
    fullPayload += raw + "\n---CHUNK ERROR---\n";
  }
}

fs.writeFileSync('./docs/research/rsc_payload.txt', fullPayload);
console.log('Saved RSC payload, length:', fullPayload.length);

// Search for titles, topic names, image URLs, slugs in payload
const topics = [];
const topicMatch = fullPayload.match(/["'](\/chu-de\/[^"']+)["']/g) || [];
console.log('Unique topic links in payload:', [...new Set(topicMatch)]);

// Search for any titles or labels
const titleMatches = fullPayload.match(/title["']:\s*["']([^"']+)["']/g) || [];
console.log('Title matches count:', titleMatches.length);
console.log('Sample titles:', titleMatches.slice(0, 30));
