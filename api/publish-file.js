const fetch = require('cross-fetch');
const config = require('../config.json');
const { getPushEndpoint } = require('./get-endpoints');

async function publishFile(data) {
    const {
        region, environment, organizationId, pageName, apiKey,
    } = config;
    const url = await getPushEndpoint(region, environment, organizationId, pageName);
    const options = {
        method: 'POST',
        headers: {
            authorization: `Bearer ${apiKey}`,
            'Content-Type': 'text/html',
        },
        body: data,
    };
    const res = await fetch(url, options);
    if (Math.floor(res.status / 100) === 2) {
        console.log('Synchronized successfully', res.status);
    } else {
        console.log(`${res.status} Failed to synchronize IPX contents`);
        console.log(await res.json());
    }
}

module.exports = { publishFile };
