const baseURL = `https://5jdezsz635.execute-api.us-east-1.amazonaws.com/dev`;
// export const baseURL = `http://34.199.12.114:6057/api`;

const config = {
  baseURL,
  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organizations/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_ENVIRONMENT_DATA:  `${baseURL}/query/organizations/#org-id#/landing-zone/#landing-zone-id#/infra-topology`,
  GET_DEPARTMENTS: `${baseURL}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `/cloud-environments`,
  GET_ORG_WISE_DEPARTMENTS: `${baseURL}/query/organizations/#org-id#/departments`,
  DEPARTMENTS: `/departments`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_PRODUCTS_BY_DEPID:`/query/organizations/#org-id#/departments/#dep-id#/products`,
  GET_DEPLOYMENT_ENVIRONMENTS:`/deployment-environments`,
  GET_CURRENT_HOUR_SPEND_RATE:`/query/spend-current-rate/organization/#org-id#/hour/analytics`,
  GET_CURRENT_DAY_SPEND_RATE:`/query/spend-current-rate/organization/#org-id#/day/analytics`,
  GET_TODAY_SPEND_ANALYTICS:`/query/spend-today/organization/#org-id#/analytics`,
  GET_YESTERDAY_SPEND_ANALYTICS: `/query/spend-yesterday/organization/#org-id#/analytics`
  
};

export default config;
