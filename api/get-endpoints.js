const fetch = require('cross-fetch');

const REGIONS_LIST_ENDPOINT = 'https://platform.cloud.coveo.com/rest/global/regions';

const getSearchPageUrlBase = async (region, isHipaaOrg) => {
    let base = 'search.cloud.coveo.com';
    if (isHipaaOrg) {
        base = 'searchhipaa.cloud.coveo.com';
    } else if (region) {
        const regionList = await (await fetch(REGIONS_LIST_ENDPOINT)).json();
        base = regionList.find((regionInList) => regionInList.regionName === region)?.hostedSearchPagesEndpoint
            ?? (() => { throw new Error(`Region ${region} not found. Available regions are ${regionList.map((regionInList) => regionInList.regionName)}`); })();
    }
    return base;
};

const getPlatformUrlBase = async (region, isHipaaOrg) => {
    let base = 'platform.cloud.coveo.com';
    if (isHipaaOrg) {
        base = 'platformhipaa.cloud.coveo.com';
    } else if (region) {
        const regionList = await (await fetch(REGIONS_LIST_ENDPOINT)).json();
        base = regionList.find((regionInList) => regionInList.regionName === region)?.mainEndpoint
            ?? (() => { throw new Error(`Region ${region} not found. Available regions are ${regionList.map((regionInList) => regionInList.regionName)}`); })();
    }
    return base;
};

const getPushEndpoint = async (region, isHipaaOrg, organizationId, pageName) => `https://${getSearchPageUrlBase(region, isHipaaOrg)}/pages/${organizationId}/${pageName}`;

const getPullEndpoint = async (region, isHipaaOrg, organizationId, pageId) => `https://${getSearchPageUrlBase(region, isHipaaOrg)}/pages/${organizationId}/inappwidget/${pageId}?json=1`;

module.exports = {
    getSearchPageUrlBase,
    getPlatformUrlBase,
    getPushEndpoint,
    getPullEndpoint,
};
