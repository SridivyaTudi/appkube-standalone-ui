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
  GET_ROLES: `${baseSecurityUrl}/roles/listAll`,
  GET_ROLE_BY_ID: `${baseSecurityUrl}/roles/#role-id#`,
  GET_POLICIES: `${baseSecurityUrl}/policy/listAll`,
  DELETE_ROLE: `${baseSecurityUrl}/roles/delete/#role-id#`,
  GET_PERMISSION_CATEGORY: `${baseSecurityUrl}/permission-category/listAll`,
  CREATE_POLICY: `${baseSecurityUrl}/policy/create`,
  DELETE_POLICY: `${baseSecurityUrl}/policy/delete/#policy-id#`,
  GET_USERS: `${baseSecurityUrl}/users/find-by-owner?ownerId=#owner-id#`,
  CREATE_USER: `${baseSecurityUrl}/users/create`,
};

export default config;
