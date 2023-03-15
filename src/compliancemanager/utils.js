import axios from "axios";

export default class Utils {
  static postReq(url, data, callback) {
    console.log("Req: " + url + "\n" + data);
    axios
      .post(url, data)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        console.log("POST Err: ", error);
        callback(null, error);
      });
  }

  static getReq(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log("GET Err: ", error);
          reject(error);
        });
    });
  }

  static isNullEmpty(input) {
    if (input) {
      if (input.trim.length === 0) {
        return false;
      }
    }
    return true;
  }
}
