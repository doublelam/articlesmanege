import { Method, ResponseJson } from "../types/types";

type PromiseTypes = Promise<ResponseJson>;

export const ajax = (url: string, opt: RequestInit) => {
  return fetch(url, opt).then(response => {
    const resI = response.clone();
    return resI.blob().then(d => {
      const data: Promise<ResponseJson> = (CONTENT_MAP[d.type] ||
        CONTENT_MAP.otherwise)(response.clone());
      return data;
    });
  });
};

const request = (method: Method, url: string, params?: object): PromiseTypes => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const option: RequestInit = {
    credentials: "include",
    headers,
    method,
  };

  if (params) {
    option.body = JSON.stringify(params);
  }
  return ajax(url, option).then(data => {
    if (!data.success) {
      Promise.reject(data.error);
    }
    return data;
  }).catch(e => {
    return Promise.reject(e);
  });
};

export const post = (url: string, params?: object): PromiseTypes => request("POST", url, params);
export const get = (url: string, params?: object): PromiseTypes => request("GET", url, params);
const CONTENT_MAP = {
  otherwise: (res: Response): Promise<ResponseJson> => {
    const json = res.clone().json();
    return json;
  },
};
