const envsUrl = `http://34.199.12.114:6057/api`;
const baseURL = "http://34.199.12.114:5057/api";
const authUrl = "http://34.199.12.114:8094/security";
const config = {
  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `${envsUrl}/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `${envsUrl}/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORGS: `${envsUrl}/organizations`,
  GET_DEPARTMENT_WISE_DATA: `${baseURL}/department-wise-analytics/get-data`,
  GET_ACCOUNT_SERVICES: `${baseURL}/account-services/search`,
  GET_DEPARTMENTS: `${envsUrl}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `${envsUrl}/cloud-environments`,

  /* AUTH SERVICES */
  SIGN_UP: `${authUrl}/users/create`,
  SIGN_IN: `${authUrl}/public/login`,

  /* COMPLIANCEMANAGER SERVICES  */
  USERID: "admin",
  PASSWORD: "password",
};

export default config;
