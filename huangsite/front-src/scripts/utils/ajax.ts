import { Method } from '../types/types';

export const ajax = (url: string, opt: RequestInit): Promise<Response> => {
  return fetch(url, opt).then(response => {
    const _res = response.clone();
    return _res.blob().then(d => {
      return (CONTENT_MAP[d.type] ||
        CONTENT_MAP['otherwise'])(response.clone());
    })
  })
}



const request = (method: Method, url: string, params?: object) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
  })
  let option: RequestInit = {
    method: method,
    credentials: 'include',
    headers: headers
  }
  if (params) {
    option.body = JSON.stringify(params)
  }
  console.log('option', option)
  return ajax(url, option).then((data: any) => {
    if (!data.success) {
      console.error('Got data with error: ', data.error);
      return Promise.reject(data.error);
    }
    return data;
  }).catch(e => {
    console.error('Get error from fetch: ', e);
    return Promise.reject(e);
  })
}

export const post = (url: string, params?: object): Promise<Response> => request('POST', url, params);
export const get = (url: string, params?: object): Promise<Response> => request('GET', url, params);
const CONTENT_MAP = {
  'otherwise': (res: Response) => {
    const json = res.clone().json();
    return json;
  },
}
