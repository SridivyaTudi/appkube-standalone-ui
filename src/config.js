const searchSrvUrl = `http://34.199.12.114:8092`;
const alertSrvUrl = `http://34.199.12.114:5055`;
const ticketSrvUrl = `http://34.199.12.114:7100/api`;

const IP = "localhost";

const policySrvUrl = `http://localhost:8098`;
const dynModelUrl = `http://localhost:8099`;
const securitySrvUrl = `http://localhost:8094`;
const catalogSrvUrl = `http://${IP}:4000/api`;

const logMrgSrvUrl = `http://100.64.3.237:9000/api`;

let config = {
  baseURL: "http://34.199.12.114:5057/api",
  alertManagerURL: "http://34.199.12.114:8092",

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
  GET_FOLDER_TREE: `${catalogSrvUrl}/listFolderTree`,
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
};

export default config;
