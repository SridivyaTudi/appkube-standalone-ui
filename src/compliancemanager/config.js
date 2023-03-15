const IP = 'localhost';

const searchSrvUrl = `http://localhost:8092`;
const policySrvUrl = `http://localhost:8098`;
const dynModelUrl = `http://localhost:8099`;
const securitySrvUrl = `http://localhost:8094`;
const catalogSrvUrl = `http://${IP}:4000/api`;

export const config = {
  basePath: '/a/xformation-compliancemanager-ui-plugin',
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
  USERID: 'admin',
  PASSWORD: 'password',
};
