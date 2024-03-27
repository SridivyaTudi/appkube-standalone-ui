import Aws from "assets/img/aws.png";
import Microsoftazure from "assets/img/microsoftazure.png";
import GoogleCloud from "assets/img/google-cloud.png";
import Kubernetes from "assets/img/kubernetes.png";

export const SERVICE_NAMES = {
  AWS: "Amazon web services",
  GCP: "Google Cloud Platform",
  AZURE: "AZURE",
};

export const LOGOS = {
  AWS: Aws,
  AZURE: Microsoftazure,
  GCP: GoogleCloud,
  KUBERNETES: Kubernetes,
};

export const SERVICE_TYPE = {
  BUSINESS: "BUSINESS",
  COMMON: "COMMON",
};

export const GRANULARITY_TYPE = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  HALF_YEARLY: "HALF YEARLY",
  YEARLY: "YEARLY",
};

export const REPORT_PAGE_TYPE = {
  SERVICE_NAMES: {
    TOTAL_LAST_MONT_SPEND: "Last #granularity# Spend",
    TOTAL_THIS_MONT_SPEND: "#granularity# to date spend",
    FORECASTED_SPEND: "Forecasted Spend",
    AVG_DAILY_SPEND: "Avg Daily Spend",
  },
};
