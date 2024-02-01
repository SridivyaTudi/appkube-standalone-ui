import axios from "axios";
import postLoginConfig from "Views/AppViews/Config";
import authConfig from "Views/AuthViews/Config";
import { ToastMessage } from "Toast/ToastMessage";
import { getCurrentOrgId } from "Utils";


const service = axios.create({
  baseURL: postLoginConfig.baseURL,
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    const currentOrg = +getCurrentOrgId();

    if (currentOrg) {
      config.url = config.url.replace("#org-id#", currentOrg);
    } else {
      ToastMessage.error("Organization is not available!");
      throw new Error("Organization is not available!");
    }

    // const jwtToken = localStorage.getItem(AUTH_TOKEN);

    // if (jwtToken) {
    //   config.headers[TOKEN_PAYLOAD_KEY] = `token ${jwtToken}`;
    // }

    // if (
    //   !jwtToken &&
    //   Object.prototype.hasOwnProperty.call(
    //     config.headers,
    //     PUBLIC_REQUEST_KEY
    //   ) &&
    //   !config.headers[PUBLIC_REQUEST_KEY]
    // ) {
    //   history.push(ENTRY_ROUTE);
    //   window.location.reload();
    // }
    return config;
  },
  (error) => {
    // Do something with request error here
    ToastMessage.error("Error");
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data.status === 404) {
      document.location.replace(document.location.origin + "/error");
    }
    return response.data;
  },
  (error) => {
    // Remove token and redirect
    if (error?.response?.status) {
      // let message = "";
      if (error.response.status === 400 || error.response.status === 403) {
        // message = "Authentication failed";
        // Handle logout
      }

      if (error.response.status === 404) {
        // message = "Not Found";
      }

      if (error.response.status === 500) {
        // message = "Error";
      }

      if (error.response.status === 508) {
        // message = "Time Out";
      }
      // ToastMessage.error("Error");
    }

    return Promise.reject(error);
  }
);

const authService = axios.create({
  baseURL: authConfig.baseSecurityUrl,
  timeout: 60000,
});

authService.interceptors.response.use(
  (response) => {
    if (response.data.status === 404) {
      document.location.replace(document.location.origin + "/error");
    }
    return response.data;
  },
  (error) => {
    // Remove token and redirect
    if (error?.response?.status) {
      // let message = "";
      if (error.response.status === 400 || error.response.status === 403) {
        // message = "Authentication failed";
        // Handle logout
      }

      if (error.response.status === 404) {
        // message = "Not Found";
      }

      if (error.response.status === 500) {
        // message = "Error";
      }

      if (error.response.status === 508) {
        // message = "Time Out";
      }
      // ToastMessage.error("Error");
    }

    return Promise.reject(error.response?.data);
  }
);

export { service as postLoginService };
export { authService as preLoginService };
