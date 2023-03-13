export const configFun = (configIp, mainProductUrl) => {
  const assetSrvUrl = `${configIp}/api`;
  const mainApplicationBaseUrl = `${mainProductUrl}/api`;
  return {
    basePath: '/a/ems-reporting-plugin',
    octantURL: 'http://localhost:7777/#/',

    USERID: 'admin',
    PASSWORD: 'password',
    // GET_ALL_ORGANIZATIONS: `${assetSrvUrl}/getAllOrganizations`,
    ADD_ORGANIZATION_UNIT: `${assetSrvUrl}/addOrganizationUnit`,
    ADD_ACCOUNT: `${assetSrvUrl}/addAccount`,

    GET_USER_ORGANIZATION: `${assetSrvUrl}/getAllOrgUnits`,
    GET_DISCOVERED_ASSETS: `${assetSrvUrl}/getDiscoveredAsset`,
    SEARCH_APPLICATION_ASSETS: `${assetSrvUrl}/searchApplicationAsset`,
    GET_APPLICATION_ASSETS_BY_INPUT_TYPE: `${assetSrvUrl}/getApplicationAssetsGropuByInputType`,
    BULK_ADD_APPLICATION_ASSETS: `${assetSrvUrl}/bulkAddApplicationAssets`,
    BULK_UPDATE_APPLICATION_ASSETS: `${assetSrvUrl}/bulkUpdateApplicationAssets`,
    ADD_INPUT_CONFIG: `${assetSrvUrl}/addInputConfig`,
    SEARCH_INPUT_CONFIG: `${assetSrvUrl}/searchInputConfig`,
    SEARCH_CONFIG_DASHBOARD: `${assetSrvUrl}/catalogue/search`,

    ADD_DASHBOARDS_TO_GRAFANA: `${mainApplicationBaseUrl}/dashboards/importAssets`,
    ADD_VIEW_JSON_TO_GRAFANA: `${assetSrvUrl}/dashboard/view-json`,
    ADD_DATASOURCE_IN_GRAFANA: `${mainApplicationBaseUrl}/datasources`,
    // UPDATE_DATASOURCE_IN_GRAFANA: `${mainApplicationBaseUrl}/datasources/updateDataSource`,
    GET_VIEW_JSON: `${mainApplicationBaseUrl}/dashboards/filterdashboards`,

    ADD_INPUT: `${assetSrvUrl}/addInput`,
    UPDATE_INPUT: `${assetSrvUrl}/updateInput`,
    SEARCH_INPUT: `${assetSrvUrl}/searchInput`,

    GET_AWS_REGIONS: `${assetSrvUrl}/getAwsRegions`,
    // PREVIEW_DASHBOARDS_URL: `${mainApplicationBaseUrl}/dashboards/previewDashboard`,
  };
};
