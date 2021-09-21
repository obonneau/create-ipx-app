const config = require('../config.json');
const { getPlatformUrlBase } = require('./get-endpoints');

/**
 * Construct the endpoint used to load the script for the IPX widget
 * @returns Url endpoint used to load IPX script
 */
function getLoaderUrl() {
    const {
        isHipaaOrg, region, organizationId, pageId,
    } = config;
    return `https://${getPlatformUrlBase(region, isHipaaOrg)}/rest/organizations/${organizationId}/pages/${pageId}/inappwidget/loader`;
}

/**
 * Get the Javascript snippet that will load the IPX in the browser
 * @returns Javascript script snippet for loading IPX
 */
function getLoaderSnippet() {
    return `<script type="text/javascript" src="${getLoaderUrl()}" async ></script>`;
}

module.exports = { getLoaderUrl, getLoaderSnippet };
