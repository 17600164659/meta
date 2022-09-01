import { API_SERVER } from '../constants';

export default {
  post: async function (path, data, header) {
    const selfToken = localStorage.getItem('custom_token');
    const result = await fetch(`${API_SERVER}${path}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${selfToken}`,
        ...(header || {}),
      },
      body: JSON.stringify(data ? data : {})
    }).then(r => r.json());
    if (result.code === 200) return result.data;
    throw result.msg;
  },
  get: async function (path, header) {
    const selfToken = localStorage.getItem('custom_token');
    const result = await fetch(`${API_SERVER}${path}`, {
      method: "get",
      headers: {
        authorization: `bearer ${selfToken}`,
        ...(header || {}),
      },
    }).then(r => r.json());
    if (result.code === 200) return result.data;
    throw result.msg;
  }
}