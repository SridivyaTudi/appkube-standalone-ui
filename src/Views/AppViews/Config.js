const baseURL = `https://api.synectiks.net/cmdb`;
const baseURLAwsXapi = `https://api.synectiks.net/awsx-api`;
// export const baseURL = `http://34.199.12.114:6057/api`;

const config = {
  baseURL,
  /* DASHBOARD SERVICES */
  PRODUCT_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/product-wise-cost/associated`,
  PRODUCTION_VS_OTHERS: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/production-vs-others/associated`,
  SERVICE_TYPE_WISE_COST: `${baseURL}/query/organization/#org-id#/analytics/cost-analytics/service-type-wise-cost/associated`,
  GET_CURRENT_HOUR_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/avg-per-hour`,
  GET_CURRENT_DAY_SPEND_RATE: `/query/organization/#org-id#/analytics/spend-analytics/spend-current-rate/per-day`,
  GET_TODAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-today`,
  GET_YESTERDAY_SPEND_ANALYTICS: `/query/organization/#org-id#/analytics/spend-analytics/spend-yesterday`,
  GET_TOTAL_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/spend-total`,
  GET_TOTAL_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/cloud-wise-spend`,
  GET_MONTHLY_CLOUD_WISE_SPEND: `/query/organization/#org-id#/analytics/spend-analytics/monthly-cloud-wise-spend`,
  GET_TOTAL_BUDGET: `/query/organization/#org-id#/analytics/spend-analytics/total-budget`,
  GET_MONTHLY_STATISTICS: `/query/organization/#org-id#/analytics/spend-analytics/monthly-statistics`,
  SLA_METRICS: `${baseURL}/query/organization/#org-id#/analytics/sla-analytics/product-wise-sla/associated`,
  PROCESS_CENTRAL: `${baseURL}/query/organization/#org-id#/analytics/process-central-analytics`,
  /* ENVIRONMENT SERVICES  */
  GET_ALL_ENVIRONMENT_COUNT: `/query/organization/#org-id#/environment/count`,
  GET_ALL_ENVIRONMENT_SUMMARY: `/query/organization/#org-id#/environment/summary-list`,
  GET_ALL_ORG_WISE_DEPARTMENTS: `/organization/#org-id#`,
  GET_DEPARTMENT_WISE_DATA: `/department-wise-analytics/get-data`,
  GET_INFRA_TOPOLOGY_DATA: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone-id/#landing-zone-id#`,
  DEPARTMENTS: `${baseURL}/department`,
  ADD_CLOUD_ENV: `/cloud-environments`,
  GET_SINGLE_ENVIRONMENT_COUNT_DATA: `${baseURL}/query/organization/#org-id#/environment/cloud/#cloud#/landing-zone/#landingZone#/count`,
  ADD_LANDING_ZONE: `${baseURL}/landingzone`,
  INFRA_TOPOLOGY_CLOUD_ELEMENT_LIST: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/cloud-elements`,
  INFRA_TOPOLOGY_CATEGORY_WISE_VIEW: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone/#landing-zone-id#/product-enclave/#product-enclave#/category-wise-summary`,
  INFRA_TOPOLOGY_DB_CATEGORIES: `${baseURL}/db-category`,
  INFRA_TOPOLOGY_LAMBDA_TABLE_DATA: `${baseURL}/cloud-element/search?elementType=#element-type#&landingzoneId=#landing-zone#&productEnclaveId=#product-enclave#`,
  INFRA_TOPOLOGY_GLOBAL_SERVICES_DATA: `${baseURL}/query/organization/#org-id#/infra-topology/landing-zone-id/#landing-zone-id#/global-service-category-wise-summary`,
  INFRA_TOPOLOGY_GLOBAL_SERVICES_CLOUD_ELEMENT_SEARCH: `${baseURL}/cloud-element/search?elementType=#element-type#`,
  ENVIRONMENTS_APPLICATIONS_TABLE_DATA: `${baseURL}/query/organization/#org-id#/application-topology/landing-zone-id/#landing-zone-id#`,
  CLOUD_WISE_LANDINGZONE_COUNT: `${baseURL}/query/organization/#org-id#/cloud-wise-landingzone/count`,
  VIEW_SERVICE: `${baseURL}/query/organization/#org-id#/landing-zone-id/#landing-zone-id#/view-service`,
  GET_ELEMENTS_FROM_ENVIRONMENTS: `${baseURL}/infra-discovery/organization/#org-id#?elementType=#landing-zone#&landingZoneId=#landing-zone-id#`,

  /* AssociateApp  */
  GET_ASSOCIATE_PRODUCT_LIST: `${baseURL}/product/search?departmentId=#department-id#`,
  GET_ASSOCIATE_PRODUCT_ENV: `${baseURL}/product-env/search?productId=#product-id#`,
  GET_ASSOCIATE_MODULES: `${baseURL}/module/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&serviceNature=#service-nature#`,
  GET_ASSOCIATE_MODULES_3_TIER: `${baseURL}/business-element/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&serviceType=#service-type#`,
  GET_ASSOCIATE_MODULE_ELEMENTS: `${baseURL}/business-element/search-by-filters?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&moduleId=#module-id#&serviceNature=#service-nature#`,
  CREATE_ASSOCIATE: `${baseURL}/cloud-element/associate`,
  GET_ASSOCIATE_EXISTING_TAG_LIST: `${baseURL}/cloud-element/tag/landing-zone-id/#landing-zone-id#/instance-id/#instance-id#`,
  DELETE_TAG: `${baseURL}/cloud-element/tag/landing-zone-id/#landing-zone-id#/instance-id/#instance-id#/service-id/#service-id#`,

  /* Service View Topology  */
  GET_SERVICE_VIEW: `/query/organization/#org-id#/application-topology/service-view?`,

  /* BI-Mapping  */
  GET_ELEMENT_TYPE: `/query/organization/#org-id#/bi-mapping/cloud-element?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#`,
  GET_ELEMENT_INSTANCES_TYPE: `/query/organization/#org-id#/bi-mapping/cloud-element-instance?departmentId=#department-id#&productId=#product-id#&productEnvId=#product-env-id#&elementType=#element-type#`,
  GET_BI_SERVICES_FROM_PRODUCT_CATEGORY: `/bi-service/search?productCategory=#product-category#`,
  GET_CLOUD_SERVICES: `/cloud-service/search?productCategory=#product-category#&serviceCategory=#service-category#&status=ACTIVE`,
  GET_INSTANCES_SERVICES: `/cloud-element/search?cloud=#cloud-name#&elementType=#element-type#&landingzoneId=#landingzone-id#`,
  ADD_BI_MAPPING: `/bi-mapping/add`,
  ADD_DEPARTMENT: `department`,
  ADD_DEPARTMENT_WITH_LANDINGZONE: `/department/add-department-with-landing-zone`,
  GET_LANDINGZONE: `/landingzone/search?organizationId=#org-id#&cloud=#cloud#`,
  GET_LANDINGZONE_DEPARTMENT: `/landingzone/search?departmentId=#department-id#&organizationId=#org-id#`,
  GET_COMMON_SERVICE_MODULES: `/bi-service/search?serviceType=#service-type#`,
  GET_SERVICES_FROM_SERVICE_MODULE: `/bi-service/search?serviceType=#service-type#&serviceModule=#service-module#`,

  /* Reporting */
  GET_SPEND_OVERVIEW: `/reporting/organization/#org-id#/spend-overview?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_SPEND_OVERVIEW_COMPUTE_DETAILS: `/reporting/organization/#org-id#/spend-overview/detail?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_TOP_USED_SERVICE: `/reporting/organization/#org-id#/top-used-service?service=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#&noOfRecords=#no-of-records#&order=#order#`,
  GET_TOP_USED_SERVICE_DETAILS: `/reporting/organization/#org-id#/top-used-service/detail?cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_POTENTIAL_SERVICES: `/reporting/organization/#org-id#/potential-savings?cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_COST_TOP_ACCOUNTS: `/reporting/organization/#org-id#/cost-top-accounts?cloud=#cloud-name#&account=#account#&granularity=#granularity#&compareTo=#compare-to#&noOfRecords=#no-of-records#&order=#order#`,
  GET_SPENDING_TREND: `/reporting/organization/#org-id#/spending-trend?cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#&forcast=#forcast#`,
  GET_COMPUTE_SUMMARY: `/reporting/organization/#org-id#/potential-savings/detail/summary?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_POTENTIAL_TOTAL_SAVING: `/reporting/organization/#org-id#/potential-savings/detail/total-savings?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_POTENTIAL_MONTHLY_SAVING: `/reporting/organization/#org-id#/potential-savings/detail/monthly-savings?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_TOP_RI_RECOMMENDATIONS: `/reporting/organization/#org-id#/potential-savings/detail/top-ri-recommendation?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_ELEMENT_SUMMARY: `reporting/organization/#org-id#/spend-overview/element-summary?serviceCategory=#service-category#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#&elementType=#element-type#`,
  GET_ELEMENT_DETAILS: `reporting/organization/#org-id#/spend-overview/element-detail?serviceCategory=#service-category#&elementType=#element-type#&cloud=#cloud-name#&granularity=#granularity#&compareTo=#compare-to#`,
  GET_COST_TOP_ACCOUNTS_DETAILS:
    "/reporting/organization/#org-id#/cost-top-accounts/detail",
  GET_TOP_ACCOUNTS_BY_ACCOUNT_ID:
    "/reporting/organization/#org-id#/cost-top-accounts",

  /* Discovered Assets*/
  GET_DISCOVERED_ASSETS:
    "/cloud-element/org/#org-id#/all-elements?filterFlag=#filter-flag#&landingZoneId=#landing-zone-id#",
  GET_AWS_REGIONS: `/aws-regions`,
  GET_LANDINGZONE_SEARCH: `/landingzone/search?organization_id=#org-id#`,

  /* AWS-X-API*/
  /* Discovered Assets*/
  GET_EVENTS_HISTORY: `${baseURLAwsXapi}/getEvents?instanceId=#instance-id#&landingZoneId=#landing-zone-id#`,
  GET_ALARM_LIST: `${baseURLAwsXapi}/getQueryOutput?elementType=#element-type#&landingZoneId=#landing-zone-id#&query=getCwAlarmList&instanceId=#instance-id#`,
};

export default config;
