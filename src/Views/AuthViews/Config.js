const baseSecurityUrl = "https://40fglalyd0.execute-api.us-east-1.amazonaws.com/dev";
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
  CREATE_GROUP: `${baseSecurityUrl}/roles/create`,
};

export default config;
