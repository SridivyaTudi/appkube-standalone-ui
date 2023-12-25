const baseSecurityUrl = "https://api.synectiks.net/security";
// const baseSecurityUrl = "http://34.199.12.114:8094/security";

const config = {
  baseSecurityUrl,
  /* SIGN UP AND SIGN IN SERVICES */
  LOGIN: `${baseSecurityUrl}/public/login`,
  SIGN_UP: `${baseSecurityUrl}/users/create`,
  SENT_EMAIL_TO_COMPANY_ADMIN: `${baseSecurityUrl}/users/create/new-org-user`,

  /* FORGET PASSWORD SERVICES */
  FORGET_PWD: `${baseSecurityUrl}/users/forgot-password`,
  RESET_PWD: `${baseSecurityUrl}/users/reset-password`,

  /* SETTINGS PAGE SECURITY URL */
  GET_MFA_CODE: `${baseSecurityUrl}/users/mfaCode`,
  AUTH_MFA: `${baseSecurityUrl}/users/authenticateMfa`,
  CREATE_ROLE: `${baseSecurityUrl}/roles/create`,
  UPDATE_ROLE: `${baseSecurityUrl}/roles/update`,
  CREATE_GROUP: `${baseSecurityUrl}/roles/create`,
  GET_ROLE_BY_ID: `${baseSecurityUrl}/roles/#role-id#`,
  DELETE_ROLE: `${baseSecurityUrl}/roles/delete/#role-id#`,
  CREATE_POLICY: `${baseSecurityUrl}/policy/create`,
  DELETE_POLICY: `${baseSecurityUrl}/policy/delete/#policy-id#`,
  CREATE_USER: `${baseSecurityUrl}/users/create`,
  DELETE_GROUP: `${baseSecurityUrl}/roles/delete/#group-id#`,
  GET_USER_PERMISSION_DATA_URL: `${baseSecurityUrl}/users/get-user-hierarchy?userName=#user-name#`,
};

export default config;
