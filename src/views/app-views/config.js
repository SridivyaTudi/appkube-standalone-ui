const envsUrl = `https://5jdezsz635.execute-api.us-east-1.amazonaws.com/dev`;
// const envsUrl = `http://34.199.12.114:6057/api`;
const baseURL = "http://34.199.12.114:5057/api";
const authUrl = "http://34.199.12.114:8094/security";

const config = {
  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `${envsUrl}/query/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `${envsUrl}/query/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORGS: `${envsUrl}/organizations`,
  GET_DEPARTMENT_WISE_DATA: `${baseURL}/department-wise-analytics/get-data`,
  GET_ACCOUNT_SERVICES: `${baseURL}/account-services/search`,
  GET_DEPARTMENTS: `${envsUrl}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `${envsUrl}/cloud-environments`,
  GET_ORG_WISE_DEPARTMENTS: `${envsUrl}/query/organizations/#org-id#/departments`,
  DEPARTMENTS: `${envsUrl}/departments`,
  ADD_CLOUD_ENV: `${envsUrl}/cloud-environments`,
  GET_PRODUCTS_BY_DEPID:`${envsUrl}/query/organizations`,
  GET_DEPLOYMENT_ENVIRONMENTS:`${envsUrl}/deployment-environments`,
  GET_ENVIRONMENTS_SUMMARY_FILTERS:`${envsUrl}/query/organizations/#org-id#/cloud-environments/summary`,


  /* AUTH SERVICES */
  SIGN_UP: `${authUrl}/users/create`,
  SIGN_IN: `${authUrl}/public/login`,

  /* COMPLIANCEMANAGER SERVICES  */
  USERID: "admin",
  PASSWORD: "password",
};

export default config;
