import { CommonService } from '../_common/common';
import { configFun } from '../../config';
const config = configFun('', '');
export const RestService = {
  getData,
  add,
  getDashboardList,
  deleteObject,
  put,
  postOptionWithAuthentication,
  optionWithAuthentication,
};

function add(url, data) {
  const requestOptions = getRequestOptions(
    'POST',
    { 'Content-Type': 'application/json;charset=UTF-8' },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function put(url, data) {
  const requestOptions = getRequestOptions(
    'put',
    { 'Content-Type': 'application/json;charset=UTF-8' },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function getData(url, extraHeaders, data) {
  const requestOptions = getRequestOptions('GET', extraHeaders, data);
  return fetch(url, requestOptions).then((response) => response.json());
}

function getRequestOptions(type, extraHeaders, body) {
  let requestOptions = {};
  requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
    },
  };
  if (body) {
    requestOptions['body'] = body;
  }
  return requestOptions;
}

function deleteObject(url) {
  return fetch(url, {
    method: 'DELETE',
    redirect: 'follow',
  }).then((response) => response.text());
}

function getDashboardList(url) {
  const requestOptions = getRequestOptions('GET', {}, null);
  return fetch(url, requestOptions).then((response) => response.json());
}

function postOptionWithAuthentication(bodyData) {
  var myHeaders = new Headers();
  // myHeaders.append("X-Requested-By", "XMLHttpRequest");
  // myHeaders.append("Referrer-Policy", "no-referrer-when-downgrade");

  myHeaders.append('Authorization', CommonService.getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: bodyData,
    redirect: 'follow',
  };
  return requestOptions;
}

function optionWithAuthentication(bodyData, methodType) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', CommonService.getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: bodyData,
    redirect: 'follow',
  };
  return requestOptions;
}
