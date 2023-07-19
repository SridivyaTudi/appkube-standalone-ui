const baseURL = `https://5jdezsz635.execute-api.us-east-1.amazonaws.com/dev`;
// export const baseURL = `http://34.199.12.114:6057/api`;

const config = {
  baseURL,
  /* DASHBOARD SERVICES */
  PRODUCT_WISE_COST: `${baseURL}/query/organizations/#org-id#/analytics/cost-analytics/product-wise-cost`,
  PRODUCTION_VS_OTHERS: `${baseURL}/query/organizations/#org-id#/analytics/cost-analytics/production-vs-others`,
  SERVICE_TYPE_WISE_COST: `${baseURL}/query/organizations/#org-id#/analytics/cost-analytics/service-type-wise-cost`,
  GET_CURRENT_HOUR_SPEND_RATE: `/query/organizations/#org-id#/analytics/spend-analytics/spend-current-rate/avg-per-hour`,
  GET_CURRENT_DAY_SPEND_RATE: `/query/organizations/#org-id#/analytics/spend-analytics/spend-current-rate/per-day`,
  GET_TODAY_SPEND_ANALYTICS: `/query/organizations/#org-id#/analytics/spend-analytics/spend-today`,
  GET_YESTERDAY_SPEND_ANALYTICS: `/query/organizations/#org-id#/analytics/spend-analytics/spend-yesterday`,
  GET_TOTAL_SPEND: `/query/organizations/#org-id#/analytics/spend-analytics/spend-total`,
  GET_TOTAL_CLOUD_WISE_SPEND: `/query/organizations/#org-id#/analytics/spend-analytics/cloud-wise-spend`,
  GET_MONTHLY_CLOUD_WISE_SPEND: `/query/organizations/#org-id#/analytics/spend-analytics/monthly-cloud-wise-spend`,
  GET_TOTAL_BUDGET: `/query/organizations/#org-id#/analytics/spend-analytics/total-budget`,
  GET_MONTHLY_STATISTICS: `/query/organizations/#org-id#/analytics/spend-analytics/monthly-statistics`,

  /* ASSETMANAGER SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organizations/#org-id#/cloud-environments/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organizations/#org-id#/cloud-environments/summary`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organizations/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_ENVIRONMENT_DATA: `${baseURL}/query/organizations/#org-id#/landing-zone/#landing-zone-id#/infra-topology`,
  GET_DEPARTMENTS: `${baseURL}/departments/search?organizationId=`,
  GET_ENVIRONMENTS: `/cloud-environments`,
  GET_ORG_WISE_DEPARTMENTS: `${baseURL}/query/organizations/#org-id#/departments`,
  DEPARTMENTS: `/departments`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_PRODUCTS_BY_DEPID: `/query/organizations/#org-id#/departments/#dep-id#/products`,
  GET_DEPLOYMENT_ENVIRONMENTS: `/deployment-environments`,
};

export default config;
