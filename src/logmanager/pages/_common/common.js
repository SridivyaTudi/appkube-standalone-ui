import { config } from '../../config';
export const CommonService = {
  getBasicAuthEncodedString,
  requestOptionsForGetRequest,
  requestOptionsForPostRequest,
};
function getBasicAuthEncodedString(userId, password) {
  var credentials = userId + ':' + password;
  var encodedString = btoa(credentials);
  var basicAuth = 'Basic ' + encodedString;
  return basicAuth;
}
function requestOptionsForGetRequest() {
  var myHeaders = new Headers();
  myHeaders.append('X-Requested-By', 'XMLHttpRequest');
  myHeaders.append('Authorization', getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return requestOptions;
}

function requestOptionsForPostRequest(bodyData) {
  var myHeaders = new Headers();
  myHeaders.append('X-Requested-By', 'XMLHttpRequest');
  myHeaders.append('Authorization', getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: bodyData,
    redirect: 'follow',
  };
  return requestOptions;
}
