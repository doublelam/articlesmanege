export type Method = 'POST' | 'GET' | 'INPUT' | 'DELETE';
export interface ResponseJson extends Response {
  success: boolean,
  content?: any,
  error?: string,
  server_time: string
}