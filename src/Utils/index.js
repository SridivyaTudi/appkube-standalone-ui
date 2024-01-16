const LOCAL_STORAGE_CONSTANTS = {
  CURRENT_USER: "currentUser",
  CURRENT_ORG_ID: "currentOrgId",
  REMEMBER_USER_NAME: "rememberUserName",
  RECENT_ENV: "recentEnv",
  CURRENT_ORG_NAME: "currentOrgName",
  ACTIVE_TAB: "activeTab",
  INFRAVIEW_DETAILS: "infraViewDetails",
  URL_DETAILS_OF_PAGE: "urlDetailsOfPage",
};

export const getCurrentUser = () => {
  const user = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS.CURRENT_USER) || null
  );

  if (user?.info?.user?.organization?.cmdbOrgId) {
    return user;
  } else {
    localStorageClear();
  }
  return null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(
      LOCAL_STORAGE_CONSTANTS.CURRENT_USER,
      JSON.stringify(user)
    );
  }
};

export const getCurrentOrgId = () => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANTS.CURRENT_ORG_ID);
};

export const getSavedUserName = () => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANTS.REMEMBER_USER_NAME);
};

export const setCurrentOrgId = (id) => {
  return localStorage.setItem(LOCAL_STORAGE_CONSTANTS.CURRENT_ORG_ID, id);
};

export const getRecentVisitedEnvironments = () => {
  const recentEnvs = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.RECENT_ENV);
  if (recentEnvs) {
    return JSON.parse(recentEnvs);
  }
  return null;
};

export const setRecentVisitedEnvironments = (recentEnvs) => {
  if (recentEnvs) {
    localStorage.setItem(
      LOCAL_STORAGE_CONSTANTS.RECENT_ENV,
      JSON.stringify(recentEnvs)
    );
  }
};

export const cloudwiseSpendColor = {
  aws: "#ff9900",
  azure: "#0089d6",
  gcp: "#da4f44",
};

export const setCurrentOrgName = (name) => {
  return localStorage.setItem(LOCAL_STORAGE_CONSTANTS.CURRENT_ORG_NAME, name);
};

export const getCurrentOrgName = () => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANTS.CURRENT_ORG_NAME);
};

export const upperCaseLengthInStr = (string) => {
  let str = "" + string;
  return str.length - str.replace(/[A-Z]/g, "").length;
};

export const lowerCaseLengthInStr = (string) => {
  let str = "" + string;
  return str.length - str.replace(/[a-z]/g, "").length;
};

export const localStorageClear = () => {
  localStorage.clear();
};

export const setUserName = (userName) => {
  return userName
    ? localStorage.setItem(LOCAL_STORAGE_CONSTANTS.REMEMBER_USER_NAME, userName)
    : null;
};

export const deleteUserName = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.REMEMBER_USER_NAME);
};

export const convertDigitToThousand = (value) => {
  return value >= 1000
    ? Number.isInteger(value / 1000)
      ? parseInt(value / 1000) + "k"
      : Number(value / 1000).toFixed(1) + "k"
    : value;
};

export const setActiveTabInEnvironmentData = (value) => {
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB, value);
};

export const getActiveTabInEnvironmentData = (value) => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB) || null;
};

export const removeActiveTabInEnvironmentData = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB);
};

export const setSelectedInfraTopologyView = (details) => {
  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS.INFRAVIEW_DETAILS,
    JSON.stringify(details)
  );
};

export const getSelectedInfraTopologyView = (details) => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS.INFRAVIEW_DETAILS) || null
  );
};

export const deleteSelectedInfraTopologyView = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.INFRAVIEW_DETAILS);
};

export const setActiveTab = (value) => {
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB, value);
};

export const getActiveTab = (value) => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB);
};

export const deleteActiveTab = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.ACTIVE_TAB);
};

export const getFormattedDate = (dateString) => {
  try {
    if (dateString) {
      let date = new Date(dateString);

      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();

      let hours = date.getHours();
      hours = `${hours % 12}`.padStart(2, "0");
      let minutes = `${date.getMinutes()}`.padStart(2, "0");

      let amPm = hours >= 12 ? "PM" : "AM";

      return `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setUrlDetailsOfPage = (data, isConvertToString = 0) => {
  let pageData = data;
  if (isConvertToString) {
    pageData = JSON.stringify(pageData);
  }
  localStorage.setItem(LOCAL_STORAGE_CONSTANTS.URL_DETAILS_OF_PAGE, pageData);
};

export const getUrlDetailsOfPage = (isConvertToObj = 0) => {
  let pageData = localStorage.getItem(
    LOCAL_STORAGE_CONSTANTS.URL_DETAILS_OF_PAGE
  );
  if (isConvertToObj) {
    pageData = JSON.parse(pageData);
  }
  return pageData;
};

export const deleteUrlDetailsOfPage = () => {
  localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.URL_DETAILS_OF_PAGE);
};

export const generateRandomPassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let pwd = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    pwd += chars.substring(randomNumber, randomNumber + 1);
  }

  return pwd;
};
