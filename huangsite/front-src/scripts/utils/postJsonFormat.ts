import { PostJson } from "../types/types";
export const postJsonFormat = (json: {[key: string]: any}): PostJson => {
  const localTime = new Date().toUTCString();
  return {
    clientTime: localTime,
    content: json,
  };
};
