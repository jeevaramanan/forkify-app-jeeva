import { API_URL, TIME_OUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // console.log(url);
    const res = await Promise.race([
      fetch(`${url}key=2ec25b5d-bf5d-46d3-bf1e-7637451e3efa`),
      timeout(TIME_OUT),
    ]);
    // console.log(res);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}  erro status ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const sendJSON = async function (url, uploadRecipe) {
  try {
    // console.log(url);
    const res = await Promise.race([
      fetch(`${url}?key=2ec25b5d-bf5d-46d3-bf1e-7637451e3efa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadRecipe),
      }),
      timeout(TIME_OUT),
    ]);
    // console.log(res);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message}  erro status ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
