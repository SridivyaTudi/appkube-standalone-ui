// const IP = "localhost";
const IP = '100.64.3.237';
const logMrgSrvUrl = `http://${IP}:9000/api`;

export const config = {
  basePath: '/plugins/xformation-logmanager-ui-plugin/page',
  STREAM: logMrgSrvUrl + `/streams`,
  TCP_INPUT_STREAM: logMrgSrvUrl + `/system/inputs`,
  SEVERITY_SUCCESS: 'success',
  SEVERITY_ERROR: 'error',
  TCP_INPUT_ADDED_SUCESS: 'TCP INPUT SAVED',
  TCP_INPUT_ADDED_ERROR: "TCP Input can't added",
  STREAM_CREATED_SUCESS: 'Stream Created',
  STREAM_CREATED_ERROR: "Stream can't created",
  GET_INDEX_SETS: logMrgSrvUrl + `/system/indices/index_sets`,
  //for local
  BASIC_AUTHORIZATION: 'Basic YWRtaW46YWRtaW4=',
  USERID: 'admin',
  PASSWORD: 'admin',
  //for server
  //BASIC_AUTHORIZATION: "Basic YWRtaW46cGFzc3dvcmQ=,
  GET_ALL_NODES_IN_CLUSTER: logMrgSrvUrl + `/cluster`,
};
