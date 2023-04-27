import config from "../config";

const apiEndPoint = {
  alertVolumeByStatus: `${config.baseURL}/getAlertVolumeByStatus`,
  slaCentral: `${config.baseURL}/analytics/sla-central`,
  cloudWiseSpend: `${config.baseURL}/analytics/cloud-wise-spend`,
  getAlertVolumeData: `${config.baseURL}/getAlertVolumeData`,
  getAvgResponseTimeGraphDataFromDb: `${config.baseURL}/getAvgResponseTimeGraphDataFromDb`,
  getWaitTimeGraphDataFromDb: `${config.baseURL}/getWaitTimeGraphDataFromDb`,
  topAlertToday: `${config.baseURL}/topAlertToday`,
  getTeamMatricsData: `${config.baseURL}/getTeamMatricsData`,
  totalRecords: `${config.alertManagerURL}/search/totalRecords?type=alert&index=alert`,
};

export default apiEndPoint;
