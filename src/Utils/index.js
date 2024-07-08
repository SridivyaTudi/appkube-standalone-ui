import { REGEX_TYPE } from "CommonData";

export const LOCAL_STORAGE_CONSTANTS = {
  CURRENT_USER: "currentUser",
  CURRENT_ORG_ID: "currentOrgId",
  REMEMBER_USER_NAME: "rememberUserName",
  RECENT_ENV: "recentEnv",
  CURRENT_ORG_NAME: "currentOrgName",
  ACTIVE_TAB: "activeTab",
  INFRAVIEW_DETAILS: "infraViewDetails",
  URL_DETAILS_OF_PAGE: "urlDetailsOfPage",
  CLOUD_WISE_LANDINGZONE_COUNT: "cloudWiseLandingZoneCount",
  ALLOWED_RBAC_PERMISSIONS: "allowedRbacPermissions",
  CURRENT_ROLE: "currentRole",
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
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!%&@#$^*?_~";

  const allChars = lowercaseChars + uppercaseChars + specialChars;

  const getRandomChar = (charset) =>
    charset[Math.floor(Math.random() * charset.length)];

  let password = "";

  const minLength = 8;
  const maxLength = 20;
  const passwordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // Ensure at least one lowercase letter
  password += getRandomChar(lowercaseChars);

  // Ensure at least one uppercase letter
  password += getRandomChar(uppercaseChars);

  // Ensure at least one special character
  password += getRandomChar(specialChars);

  // Fill the remaining characters randomly
  for (let i = 0; i < passwordLength - 3; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the characters in the password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

export const getRbacPermissions = (selectedRoleId) => {
  let groups = getCurrentUser()?.info?.user.roles;

  if (groups?.length) {
    groups = groups.filter((role) => role.id === selectedRoleId);
    return RbacPermissionsDataManipulation.getData(groups, selectedRoleId);
  } else {
    return [];
  }
};

export const setAllowedRbacPermissions = (selectedRoleId) => {
  const data = getRbacPermissions(selectedRoleId);

  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS.ALLOWED_RBAC_PERMISSIONS,
    data?.length ? JSON.stringify(data) : null
  );
};

export const getAllowedRbacPermissions = () => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS.ALLOWED_RBAC_PERMISSIONS) ||
      null
  );
};

export const RbacPermissionsDataManipulation = {
  permissions: [],
  getData: (data) => {
    RbacPermissionsDataManipulation.getGroupList(data);
    return RbacPermissionsDataManipulation.permissions;
  },
  getGroupList: (data) => {
    data.find((userData) => {
      if (userData.grp) {
        if (userData.roles?.length) {
          RbacPermissionsDataManipulation.getRoleList(userData.roles);
        }
      }
    });
  },
  getRoleList: (roleList) => {
    roleList.forEach((role) => {
      if (role.policies?.length) {
        RbacPermissionsDataManipulation.getPolicyList(role.policies);
      }
    });
  },
  getPolicyList: (policyList) => {
    policyList.forEach((policy) => {
      if (policy.permissions?.length) {
        RbacPermissionsDataManipulation.getPermissions(policy.permissions);
      }
    });
  },
  getPermissions: (permissions) => {
    permissions.forEach((category) => {
      let currentPermission = RbacPermissionsDataManipulation.permissions;
      let isExistPermission =
        RbacPermissionsDataManipulation.checkDataAlreadyExist(
          currentPermission,
          category.id
        );
      if (!isExistPermission) {
        RbacPermissionsDataManipulation.permissions.push(category);
      }
    });
  },
  checkDataAlreadyExist: (data, id) => {
    let isExist = false;
    let dataLength = data.length;

    for (let index = 0; index < dataLength; index++) {
      const element = data[index];
      if (element.id === id) {
        isExist = true;
        break;
      }
    }
    return isExist;
  },
};

export const isAlphaNumeric = (str) => {
  var alphaNumericRegex = REGEX_TYPE.ALPHA_NUMERIC;
  return alphaNumericRegex.test(str);
};

export const isAlphabet = (str) => {
  var alphabetRegex = REGEX_TYPE.ALPHABET;
  return alphabetRegex.test(str);
};

export const PRODUCT_CATEGORY_ENUM = {
  THREE_TIER: "3 TIER",
  SOA: "SOA",
  LAMBDA: "LAMBDA",
};

export const SERVICES_CATEGORY_OF_THREE_TIER_ENUM = {
  WEB: "WEB",
  APP: "APP",
  DATA: "DATA",
  AUX: "AUX",
};

export const SERVICES_CATEGORY_OF_SOA_ENUM = {
  APP: "APP",
  DATA: "DATA",
  OTHER: "OTHER",
};

export const setSingleValueInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getSingleValueFromLocalStorage = (key) => {
  return localStorage.getItem(key) || null;
};

export const removeSingleValueFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const ADD_PRODUCT_ENUMS = {
  USER_INPUT: "User input",
  CLOUD_WATCH: "",
  EC2: "EC2",
  EKS: "EKS",
  ECS: "ECS",
  LAMBDA: "LAMBDA",
  S3: "S3",
  CDN: "CDN",
  SSL: "SSL",
  APIGATEWAY: "APIGATEWAY",
};

export const ENVIRONMENTS = {
  AWS: "AWS",
  AZURE: "AZURE",
  GCP: "GCP",
  KUBERNETES: "KUBERNETES",
};

export const getDateInWeek = (date) => {
  // Create a new Date object for the target date
  const targetDate = new Date(date); // Use your desired date here

  // Calculate the day of the month
  const dayOfMonth = targetDate.getDate();

  // Calculate the week number (1 for the first week, 2 for the second week, and so on)
  const weekNumber = Math.ceil(dayOfMonth / 7);

  return weekNumber;
};

export const makeSlugForString = (str) => {
  try {
    return str
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  } catch (error) {
    return str;
  }
};

export const getCurrentUserRole = () => {
  let userDetails = getCurrentUser()?.info?.user;
  return userDetails?.type;
};

export const getRoleList = () => {
  let roles = getCurrentUser()?.info?.user.roles || [];
  return roles;
};

export const getCurrentRole = () => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONSTANTS.CURRENT_ROLE) || null
  );
};

export const setCurrentRole = (data) => {
  localStorage.setItem(
    LOCAL_STORAGE_CONSTANTS.CURRENT_ROLE,
    JSON.stringify(data)
  );
};

export const DEPLOYMENT_ENVS = {
  DEVELOPMENT: "Development",
  TEST: "Test",
  STAGE: "Stage",
  PRODUCTION: "Production",
};
