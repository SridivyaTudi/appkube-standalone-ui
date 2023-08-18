const baseURL = `https://5jdezsz635.execute-api.us-east-1.amazonaws.com/dev`;
// export const baseURL = `http://34.199.12.114:6057/api`;

const config = {
  baseURL,
  /* DASHBOARD SERVICES */
  PRODUCT_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/product-wise-cost`,
  PRODUCTION_VS_OTHERS: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/production-vs-others`,
  SERVICE_TYPE_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/service-type-wise-cost`,
  GET_CURRENT_HOUR_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/avg-per-hour`,
  GET_CURRENT_DAY_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/per-day`,
  GET_TODAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-today`,
  GET_YESTERDAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-yesterday`,
  GET_TOTAL_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/spend-total`,
  GET_TOTAL_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/cloud-wise-spend`,
  GET_MONTHLY_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/monthly-cloud-wise-spend`,
  GET_TOTAL_BUDGET: `/query/organization/#org-id#/analytics/spend-analytics/total-budget`,
  GET_MONTHLY_STATISTICS: `/query/organization/#org-id#/analytics/spend-analytics/monthly-statistics`,

  /* ENVIRONMENT SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organization/#org-id#/environment/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organization/#org-id#/environment/summary-list`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organization/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_ENVIRONMENT_DATA: `${baseURL}/query/organization/#org-id#/landing-zone/#landing-zone-id#/infra-topology`,
  GET_INFRA_TOPOLOGY_DATA: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#`,
  GET_DEPARTMENTS: `${baseURL}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `/cloud-environments`,
  GET_ORG_WISE_DEPARTMENTS: `${baseURL}/query/organization/#org-id#/departments`,
  DEPARTMENTS: `/departments`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_PRODUCTS_BY_DEPID: `/query/organization/#org-id#/departments/#dep-id#/products`,
  GET_DEPLOYMENT_ENVIRONMENTS: `/deployment-environments`,
  GET_SINGLE_ENVIRONMENT_COUNT_DATA: `${baseURL}/query/organization/#orgId#/cloud/#cloud#/landing-zone/#landingZone#/cloud-environments/count`,
  ADD_LANDING_ZONE: `${baseURL}/landingzone`,
  INFRA_TOPOLOGY_CLOUD_ELEMENT_LIST: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/cloud-elements`,
  INFRA_TOPOLOGY_CATEGORY_WISE_VIEW: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/category-wise-summary`,
};

export default config;
