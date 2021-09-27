const config = require('../config.json');
const { getCoveoAPIUrl, PLATFORM_ENDPOINT_NAME } = require('./get-endpoints');

/**
 * Construct the endpoint used to load the script for the IPX widget
 * @returns Url endpoint used to load IPX script
 */
async function getLoaderUrl() {
    const {
        environment, region, organizationId, pageId,
    } = config;
    return `https://${await getCoveoAPIUrl(region, environment, PLATFORM_ENDPOINT_NAME)}/rest/organizations/${organizationId}/pages/${pageId}/inappwidget/loader`;
}

/**
 * Get the Javascript snippet that will load the IPX in the browser
 * @returns Javascript script snippet for loading IPX
 */
async function getLoaderSnippet() {
    return `<script type="text/javascript" src="${await getLoaderUrl()}" async ></script>`;
}

module.exports = { getLoaderUrl, getLoaderSnippet };
