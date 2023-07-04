import axios from "axios";

export default axios.create({
  baseURL: `https://34.199.12.114:6057/api`,
  timeout: 60000,
});
