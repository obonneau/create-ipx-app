const path = require('path');
const fs = require('fs');
const { publishFile } = require('../api/publish-file');

function getIPXHtml() {
    return fs.readFileSync(path.resolve(__dirname, '../dist/ipx.html'), 'utf-8');
}

async function main() {
    const file = getIPXHtml();
    await publishFile(file);
}

main();
