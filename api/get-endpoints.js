const fetch = require('cross-fetch');

const PLATFORM_ENDPOINT_NAME = 'mainEndpoint';
const SEARCH_ENDPOINT_NAME = 'hostedSearchPagesEndpoint';

const getRegionsListEndpoint = (environment) => `https://platform${environment}.cloud.coveo.com/rest/global/regions`;

const getCoveoAPIUrl = async (region, environment, endpoint) => {
    if (endpoint !== PLATFORM_ENDPOINT_NAME && endpoint !== SEARCH_ENDPOINT_NAME) {
        throw new Error(`Endpoint ${endpoint} is not valid`);
    }
    const regionListEndpoint = getRegionsListEndpoint(environment);
    const regionList = await (await fetch(regionListEndpoint)).json();
    if (!region) {
        return regionList[0].hostedSearchPagesEndpoint;
    }
    return regionList.find((regionInList) => regionInList.regionName === region)?.[endpoint]
        ?? (
            () => {
                const availableRegions = regionList
                    .filter((regionInList) => !!regionInList.hostedSearchPagesEndpoint)
                    .map((regionInList) => regionInList.regionName);
                throw new Error(`Region ${region} not found. Available regions for platform${environment} are ${availableRegions}`);
            })();
};

const getPushEndpoint = async (region, environment, organizationId, pageName) => `https://${await getCoveoAPIUrl(region, environment, SEARCH_ENDPOINT_NAME)}/pages/${organizationId}/${pageName}`;

const getPullEndpoint = async (region, environment, organizationId, pageId) => `https://${await getCoveoAPIUrl(region, environment, PLATFORM_ENDPOINT_NAME)}/pages/${organizationId}/inappwidget/${pageId}?json=1`;

module.exports = {
    getCoveoAPIUrl,
    getPushEndpoint,
    getPullEndpoint,
    PLATFORM_ENDPOINT_NAME,
};
