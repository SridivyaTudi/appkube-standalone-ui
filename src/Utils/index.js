const LOCAL_STORAGE_CONSTANTS = {
  CURRENT_USER: "currentUser",
  CURRENT_ORG_ID: "currentOrgId",
  REMEMBER_USER_NAME: "rememberUserName",
  RECENT_ENV: "recentEnv",
  CURRENT_ORG_NAME: "currentOrgName",
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
