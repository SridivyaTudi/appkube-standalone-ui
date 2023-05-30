const searchSrvUrl = `http://34.199.12.114:8092`;
const alertSrvUrl = `http://34.199.12.114:5055`;
const ticketSrvUrl = `http://34.199.12.114:7100/api`;
const envsUrl = `http://34.199.12.114:6057/api`;

const IP = "localhost";

const policySrvUrl = `http://localhost:8098`;
const dynModelUrl = `http://localhost:8099`;
const securitySrvUrl = `http://localhost:8094`;
const catalogSrvUrl = `http://${IP}:4000/api`;

const logMrgSrvUrl = `http://100.64.3.237:9000/api`;

const PERF_MANAGER_IP = "100.64.107.25";
//const securitySrvUrl = `http://${PERF_MANAGER_IP}:8094`;
const assetSrvUrl = `http://${PERF_MANAGER_IP}:6067/api`;
const grafanaUrl = `http://${PERF_MANAGER_IP}:3000/api`;
const perfManagerCatalogSrvUrl = `http://${PERF_MANAGER_IP}:5050/api`;

const localHostTicketSrvUrl = `http://100.64.108.25:7100/api`;

let config = {
  baseURL: "http://34.199.12.114:6067/api",
  newBaseURL: "http://34.199.12.114:5057/api",
  alertManagerURL: "http://34.199.12.114:8092",

  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `${envsUrl}/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `${envsUrl}/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORGS: `${envsUrl}/organizations`,

  /* ALERTMANAGER SERVICES  */
  alertManagerBasePath: "/alertmanager/page",
  GET_ALL_ALERT_FROM_ELASTIC: `${alertSrvUrl}/api/listAllAlertFromElastic`,
  GET_ALL_ALERT_FROM_DB: `${alertSrvUrl}/api/listAlert`,
  UPDATE_ALERT: `${alertSrvUrl}/api/updateAlert`,
  DELETE_ALERT: `${alertSrvUrl}/api/deleteAlert`,
  TOP_ALERT_TODAY: `${alertSrvUrl}/api/topAlertToday`,
  GET_ALERT_VOLUME_DATA: `${alertSrvUrl}/api/getAlertVolumeData`,
  GET_ALERT_VOLUME_BY_STATUS: `${alertSrvUrl}/api/getAlertVolumeByStatus`,
  // GET_AVG_RESP_TIME_DATA: `${alertSrvUrl}/api/getAvgResponseTime`,
  GET_AVG_RESP_TIME_DATA: `${alertSrvUrl}/api/getAvgResponseTimeGraphDataFromDb`,
  // GET_AVG_WAIT_TIME_DATA: `${alertSrvUrl}/api/getWaitTimeGraphData`,
  GET_AVG_WAIT_TIME_DATA: `${alertSrvUrl}/api/getWaitTimeGraphDataFromDb`,
  TOTAL_ALERTS: `${searchSrvUrl}/search/totalRecords`,
  GET_TICKETS_BY_GUID_URL: `${ticketSrvUrl}/alertTicketsByGuid`,
  GET_TEAM_MATRICS_DATA_URL: `${ticketSrvUrl}/getTeamMatricsData`,
  GET_ALERT_ACTIVITIES: `${alertSrvUrl}/api/getDataFromAlertActivity`,

  ALERT_MANAGER_PARENT_NAME: "alertmanager",

  SEVERITY_ERROR: "error",
  SEVERITY_SUCCESS: "success",
  SERVER_ERROR_MESSAGE:
    "Operation failed. Please check service logs for details",
  UPDATE_ALERT_SUCCESS_MESSAGE: "Alert updated successfully",

  /* COMPLIANCEMANAGER SERVICES  */
  complianceManagerBasePath: "/a/xformation-compliancemanager-ui-plugin",
  GET_ALL_COLLECTOR: `${catalogSrvUrl}/listCollector`,
  PERMS_LIST_ALL: `${securitySrvUrl}/security/permissions/listAll`,
  GET_ENTITIES_LIST: `${searchSrvUrl}/search/getIndexes`,
  POST_RULE: `${policySrvUrl}/rule/create`,
  POST_POLICY: `${policySrvUrl}/policy/create`,
  LIST_RULES: `${policySrvUrl}/rule/listAll`,
  SUGGEST_URL: `${policySrvUrl}/suggestKey`,
  ELS_QUERY: `${searchSrvUrl}/search/elsQuery`,
  GET_MAPPINGS: `${searchSrvUrl}/search/getIndexMapping`,
  GET_OPERTORS: `${policySrvUrl}/operatorsByType`,
  LIST_ALL_CLD_GRP: `${dynModelUrl}/cloudEntity/listAll`,
  USERID: "admin",
  PASSWORD: "password",

  /* LOG MANAGER SERVICES */
  logManagerBasePath: "/plugins/xformation-logmanager-ui-plugin/page",
  STREAM: logMrgSrvUrl + `/streams`,
  TCP_INPUT_STREAM: logMrgSrvUrl + `/system/inputs`,
  TCP_INPUT_ADDED_SUCESS: "TCP INPUT SAVED",
  TCP_INPUT_ADDED_ERROR: "TCP Input can't added",
  STREAM_CREATED_SUCESS: "Stream Created",
  STREAM_CREATED_ERROR: "Stream can't created",
  GET_INDEX_SETS: logMrgSrvUrl + `/system/indices/index_sets`,
  //for local
  BASIC_AUTHORIZATION: "Basic YWRtaW46YWRtaW4=",
  //for server
  //BASIC_AUTHORIZATION: "Basic YWRtaW46cGFzc3dvcmQ=,
  GET_ALL_NODES_IN_CLUSTER: logMrgSrvUrl + `/cluster`,

  /* PERF MANAGER SERVICES */
  perfManagerBasePath: "perfmanager",
  octantURL: "http://localhost:7777/#/",
  GET_ALL_ACCOUNT: `${assetSrvUrl}/searchAccounts`,
  GET_ACCOUNT_BY_ID: `${assetSrvUrl}/getAccount`,
  PARENT_NAME: "perfmanager",
  ADD_Organization: `${assetSrvUrl}/addEnvironment`,
  REMOVE_COLLECTOR: `${catalogSrvUrl}/removeCollector`,
  DELETE_LIBRARY: `${catalogSrvUrl}/deleteCollector`,
  REMOVE_FOLDER: `${catalogSrvUrl}/removeFolder`,
  DELETE_DASHBOARD: `${catalogSrvUrl}`,
  UPDATE_CATALOG_SUCCESS: "Catalogue updated successfully",
  UPDATE_DASHBOARD_MONITOR_FLAG: "Dashborad Monitor flag is updated",
  UPDATE_DASHBOARD_MONITOR_FLAG_URL: `${catalogSrvUrl}/updateDashbordMonitorFlag`,
  GET_LIBRARY_TREE: `${catalogSrvUrl}/listLibraryTree`,
  DASHBOARD_LIST_API: "/api/search",
  UPDATE_CATALOG: `${catalogSrvUrl}/updateCollector`,
  UPDATE_CATALOG_ERROR: " Catalog Can't update",
  GET_FOLDER_TREE: `${catalogSrvUrl}/listFolderTree`,
  ADD_COLLECTOR_TO_LIBRARY: `${catalogSrvUrl}/addCollectorToLibrary`,
  ADD_COLLECTOR_TO_LIBRARY_SUCCESS_MESSAGE:
    "Collector is successfully added to library",
  ADD_DASHBOARD_TO_COLLECTOR: `${catalogSrvUrl}/addDashboardToCollector`,
  ADD_DASHBOARD_TO_COLLECTOR_SUCCESS_MESSAGE:
    "Dashborad is successfully added to collector",
  DASHBOARD_TYPES: ["KPI", "LOG", "SCHEMA"],
  ADD_CATALOG: `${catalogSrvUrl}/addCollector`,
  ADD_CATALOGUE_SUCCESS_MESSAGE: "Catalogue added successfully",
  CATALOG_SUB_TYPES_JSON: {
    AWS: ["VPS", "VPN", "RSD"],
    AZURE: ["X", "Y", "Z"],
    GCP: ["A", "B", "C"],
    Synectiks: ["P", "Q", "R"],
  },

  DASHBOARD_JSON: {
    Uid: "",
    Uuid: "",
    Slug: "",
    Title: "",
    OrgId: 1,
    "GnetId ": 0,
    Version: "1",
    PluginId: "",
    UpdatedBy: "1",
    CreatedBy: "1",
    FolderId: 0,
    IsFolder: false,
    HasAcl: false,
    Data: "",
    SourceJsonRef: "",
    InputSourceId: "",
    AccountId: "",
    TenantId: "",
    IsCloud: true,
    CloudName: "",
    ElementType: "",
    FileName: "",
    InputType: "",
  },
  RAW: {
    Dashboard: {},
    UserId: 1,
    Overwrite: true,
    Message: "",
    OrgId: 1,
    PluginId: "",
    FolderId: 0,
    IsFolder: false,
  },

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

  ADD_DASHBOARDS_TO_GRAFANA: `${grafanaUrl}/dashboards/importAssets`,
  ADD_DATASOURCE_IN_GRAFANA: `${grafanaUrl}/datasources`,
  // UPDATE_DATASOURCE_IN_GRAFANA: `${grafanaUrl}/datasources/updateDataSource`,
  GET_VIEW_JSON: `${grafanaUrl}/dashboards/filterdashboards`,

  ADD_INPUT: `${assetSrvUrl}/addInput`,
  UPDATE_INPUT: `${assetSrvUrl}/updateInput`,
  SEARCH_INPUT: `${assetSrvUrl}/searchInput`,

  GET_AWS_REGIONS: `${assetSrvUrl}/getAwsRegions`,
  PREVIEW_DASHBOARDS_URL: `${grafanaUrl}/dashboards/previewDashboard`,
  SEARCH_CONFIG_DASHBOARD: `http://18.234.236.211:6067/api/catalogue/search`,

  /* SERVICE DESK SERVICES */
  serviceDeskBasePath: "/servicedesk",
  SERVICEDESK_API_URL: "",
  ADD_COMPANY_URL: `${ticketSrvUrl}/addCompany`,
  GET_ALL_COMPANIES_URL: `${ticketSrvUrl}/listAllcompanies`,
  GET_COMPANIES_CONTACT_LIST_URL: `${ticketSrvUrl}/companyConatctList`,
  ADD_CONTACT_URL: `${ticketSrvUrl}/addContact`,
  ADD_TICKET_URL: `${ticketSrvUrl}/addTicket`,
  UPDATE_TICKET_URL: `${ticketSrvUrl}/updateTicket`,
  ADD_AGENT_URL: `${ticketSrvUrl}/addAgent`,
  GET_CONTACT_WITH_COMPANY_NAME: `${ticketSrvUrl}/contactWithCompanyName`,
  SEND_EMAIL_URL: `${ticketSrvUrl}/sendEmail`,
  GET_ALL_CONTACT_URL: `${ticketSrvUrl}/listAllContacts`,
  GET_ALL_AGENT_URL: `${ticketSrvUrl}/listAllAgents`,
  GET_ALL_TICKET_URL: `${ticketSrvUrl}/listAllTickets`,
  GET_ALL_TICKET_FOR_TABLE_URL: `${ticketSrvUrl}/getTicketForTable`,
  GET_ALL_TICKETING_DATA_URL: `${ticketSrvUrl}/getTicketingData`,
  GET_TICKET_BY_ID: `${ticketSrvUrl}/getTicketById`,
  GET_TOP_PERFORMER_DATA_URL: `${ticketSrvUrl}/topPerformerAgents`,
  GET_REPORT_QUICK_STAT_URL: `${ticketSrvUrl}/reportQuicStatistics`,
  GET_GRAPH_STAT_DATA_URL: `${ticketSrvUrl}/getBarGraphStatData`,
  GET_TODAYS_TICKETS__TREDNDS_DATA_URL: `${ticketSrvUrl}/getTodaysTicketTrendsData`,
  COMPANY_ADDED_SUCCESS: "Company Successfully added",
  AGENT_ADDED_SUCCESS: "Agent Successfully added",
  COMPANY_ADDED_ERROR: "Company Can't added",
  AGENT_ADDED_ERROR: "Agent Can't added",
  CONTACT_ADDED_SUCCESS: "Company Successfully added",
  CONTACT_ADDED_ERROR: "Company Can't added",
  SEND_EMAIL_SUCCESS: "Email sent successfully",
  SEND_EMAIL_ERROR: "Can't send Email",
  ADD_TICKET_SUCCESS: "Ticket Successfully added",
  UPDATE_TICKET_SUCCESS: "Ticket Updated successfully",
  ADD_TICKET_ERROR: "Ticket Can't added",
  SERVICE_DESK_PARENT_NAME: "xformation-servicedesk-ui-plugin",
};

export default config;
