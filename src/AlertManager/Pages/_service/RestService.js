export const RestService = {
  getData,
  add,
  deleteObject,
};

function add(url, data) {
  const requestOptions = getRequestOptions(
    "POST",
    { "Content-Type": "application/json;charset=UTF-8" },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function getData(url, extraHeaders, data) {
  const requestOptions = getRequestOptions("GET", extraHeaders, data);
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
    requestOptions["body"] = body;
  }
  return requestOptions;
}

function deleteObject(url) {
  return fetch(url, {
    method: "DELETE",
    redirect: "follow",
  }).then((response) => response.json());
}
