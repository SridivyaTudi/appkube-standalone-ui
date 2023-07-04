// const envsUrl = `https://5jdezsz635.execute-api.us-east-1.amazonaws.com/dev`;
const envsUrl = `https://34.199.12.114:6057/api`;
const baseURL = "http://34.199.12.114:5057/api";
const authUrl = "http://34.199.12.114:8094/security";

const config = {
  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organizations/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_ACCOUNT_SERVICES: `/account-services/search`,
  GET_DEPARTMENTS: `${envsUrl}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `/cloud-environments`,
  GET_ORG_WISE_DEPARTMENTS: `${envsUrl}/query/organizations/#org-id#/departments`,
  DEPARTMENTS: `/departments`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_PRODUCTS_BY_DEPID:`/query/organizations/#org-id#/departments/#dep-id#/products`,
  GET_DEPLOYMENT_ENVIRONMENTS:`/deployment-environments`,


  /* AUTH SERVICES */
  SIGN_UP: `${authUrl}/users/create`,
  SIGN_IN: `${authUrl}/public/login`,

  /* COMPLIANCEMANAGER SERVICES  */
  USERID: "admin",
  PASSWORD: "password",
};

export default config;
