import axios from 'axios';
const config = require('../config/default.json');

export default function callApi(endpoint, method = 'GET', body) {
  return axios({
    method: method,
    url: `${config.apiURL}/${endpoint}`,
    data: body,
  });
}
