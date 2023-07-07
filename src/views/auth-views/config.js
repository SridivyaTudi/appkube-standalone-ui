// const baseSecurityUrl = "https://40fglalyd0.execute-api.us-east-1.amazonaws.com/dev";
const baseSecurityUrl = "http://34.199.12.114:8094/security";

const config = {
  baseSecurityUrl,
  /* SIGN UP AND SIGN IN SERVICES */
  LOGIN: `${baseSecurityUrl}/public/login`,
  SIGN_UP: `${baseSecurityUrl}/users/create`,
};

export default config;
