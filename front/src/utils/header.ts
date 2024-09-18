import axiosInstance from '../api/axios';

function setHeader(key: string, value: string) {
  console.log(`setHeader key : ${key}, value : ${value}`);
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
}

export {setHeader, removeHeader};
