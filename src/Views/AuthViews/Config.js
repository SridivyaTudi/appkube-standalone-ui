const baseSecurityUrl = "https://api.synectiks.net/security";
// const baseSecurityUrl = "http://34.199.12.114:8094/security";

const config = {
  baseSecurityUrl,
  /* SIGN UP AND SIGN IN SERVICES */
  LOGIN: `${baseSecurityUrl}/public/login`,
  SIGN_UP: `${baseSecurityUrl}/users/create`,
  SENT_EMAIL_TO_COMPANY_ADMIN: `${baseSecurityUrl}/users/new-org-user`,

  /* FORGET PASSWORD SERVICES */
  FORGET_PWD: `${baseSecurityUrl}/public/forgot-password`,
  RESET_PWD: `${baseSecurityUrl}/users/reset-password-by-otp`,

  /* SETTINGS PAGE SECURITY URL */
  GET_MFA_CODE: `${baseSecurityUrl}/users/mfaCode`,
  AUTH_MFA: `${baseSecurityUrl}/users/authenticateMfa`,
  DISABLE_AUTH_MFA: `${baseSecurityUrl}/users/disableMfa`,
  CREATE_ROLE: `${baseSecurityUrl}/roles/create`,
  UPDATE_ROLE: `${baseSecurityUrl}/roles/update`,
  CREATE_GROUP: `${baseSecurityUrl}/roles/create`,
  GET_ROLE_BY_ID: `${baseSecurityUrl}/roles/#role-id#`,
  GET_GROUP_BY_ID: `${baseSecurityUrl}/roles/get-role-group-details?userName=#user-name#&roleId=#role-id#`,
  DELETE_ROLE: `${baseSecurityUrl}/roles/delete/#role-id#`,
  CREATE_POLICY: `${baseSecurityUrl}/policy/create`,
  DELETE_POLICY: `${baseSecurityUrl}/policy/delete/#policy-id#`,
  CREATE_USER: `${baseSecurityUrl}/users/create`,
  DELETE_GROUP: `${baseSecurityUrl}/roles/delete/#group-id#`,
  GET_USER_PERMISSION_DATA_URL: `${baseSecurityUrl}/users/get-user-hierarchy?userName=#user-name#`,
  GET_USER_BY_ID: `${baseSecurityUrl}/users/#user-id#`,
  DELETE_USER: `${baseSecurityUrl}/users/delete/#user-id#`,
  ADD_USER_TO_GROUPS: `${baseSecurityUrl}/users/updateUserRoles?userName=#user-name#&roleId=#role-id#`,
  ADD_USERS_FROM_GROUP_DETAILS: `${baseSecurityUrl}/users/assingRoleGroupToUsers`,
  GET_PENDING_USER_REQUESTS: `${baseSecurityUrl}/users/get-pending-user-requests?organizationId=#org-id#`,
  GET_CONFIRMED_USER_REQUESTS: `${baseSecurityUrl}/users/get-confirmed-user-requests?organizationId=#org-id#`,
  GET_PENDING_USER_COUNT: `${baseSecurityUrl}/users/get-pending-user-request-count?organizationId=#org-id#`,
  PENDING_USER_REQUEST_ACTION: `${baseSecurityUrl}/users/pending-user-request-action`,
  /* CHANGE PASSWORD SERVICES */
  ACCOUNT_CHANGE_PASSWORD: `${baseSecurityUrl}/users/reset-password`,
  USER_RESET_PASSWORD: `${baseSecurityUrl}/users/reset-password-by-admin`,
};

export default config;
