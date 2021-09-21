const fetch = require('cross-fetch');
const config = require('../config.json');
const { getPullEndpoint } = require('./get-endpoints');

async function getWidget() {
    const {
        region, isHipaaOrg, organizationId, pageId, apiKey,
    } = config;
    const url = await getPullEndpoint(region, isHipaaOrg, organizationId, pageId);
    const options = {
        method: 'GET',
        headers: {
            authorization: `Bearer ${apiKey}`,
        },
    };
    const res = await fetch(url, options);
    return res.json();
}

module.exports = { getWidget };
