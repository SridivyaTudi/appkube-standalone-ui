import config from "../config";

export const RestService = {
  getData,
  postData,
  deleteData,
  putData,
  getBasicAuthEncodedString,
  requestOptionsForGetRequest,
  requestOptionsForPostRequest,
  postOptionWithAuthentication,
  optionWithAuthentication,
};

function getRequestOptions(type, extraHeaders, body) {
  let requestOptions = {};
  requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
    },
  };
  if (body) {
    requestOptions["body"] = body;
  }
  return requestOptions;
}

function getData(url, extraHeaders, data) {
  const requestOptions = getRequestOptions("GET", extraHeaders, data);
    return fetch(url, requestOptions).then((response) => {
      return response.json()
    },(error)=>{console.log(error) });  
  // } catch (error) {
  //   console.log(error)
  // }
  
}

function postData(url, data) {
  const requestOptions = getRequestOptions(
    "POST",
    { "Content-Type": "application/json;charset=UTF-8" },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function deleteData(url) {
  return fetch(url, {
    method: "DELETE",
    redirect: "follow",
  }).then(
    (response) => response.json(),
    (error) => error.json()
  );
}

function putData(url, data) {
  const requestOptions = getRequestOptions(
    "put",
    { "Content-Type": "application/json;charset=UTF-8" },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function getBasicAuthEncodedString(userId, password) {
  var credentials = userId + ":" + password;
  var encodedString = btoa(credentials);
  var basicAuth = "Basic " + encodedString;
  return basicAuth;
}

function requestOptionsForGetRequest() {
  var myHeaders = new Headers();
  myHeaders.append("X-Requested-By", "XMLHttpRequest");
  myHeaders.append(
    "Authorization",
    getBasicAuthEncodedString(config.USERID, config.PASSWORD)
  );
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return requestOptions;
}

function requestOptionsForPostRequest(bodyData) {
  var myHeaders = new Headers();
  myHeaders.append("X-Requested-By", "XMLHttpRequest");
  myHeaders.append(
    "Authorization",
    getBasicAuthEncodedString(config.USERID, config.PASSWORD)
  );
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  return requestOptions;
}

function postOptionWithAuthentication(bodyData) {
  var myHeaders = new Headers();
  // myHeaders.append("X-Requested-By", "XMLHttpRequest");
  // myHeaders.append("Referrer-Policy", "no-referrer-when-downgrade");

  myHeaders.append(
    "Authorization",
    getBasicAuthEncodedString(config.USERID, config.PASSWORD)
  );
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  return requestOptions;
}

function optionWithAuthentication(bodyData, methodType) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    getBasicAuthEncodedString(config.USERID, config.PASSWORD)
  );
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: methodType,
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  return requestOptions;
}
