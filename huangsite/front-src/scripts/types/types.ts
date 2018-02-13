import { VideoPlayerModalProps } from "../components/video-player-modal";
export type Method = "POST" | "GET" | "INPUT" | "DELETE";
export interface ResponseJson extends Response {
  success: boolean;
  content?: any;
  error?: string;
  server_time: string;
}

export interface StrokeStyles {
  widths: number[];
  colors: string[];
}
export interface Duration {
  name: string;
  duration: number;
}

export interface PostJson {
  clientTime: string;
  clientName?: string;
  content?: { [key: string]: any };
}

export interface WorkerVideoData extends Pick<VideoPlayerModalProps, "progress" | "videoData"> {
  blob?: Blob;
}
export type Type<T> = T;
export type ListType<T> = T[];
export type ScreenMode = "HORIZONTAL" | "VERTICAL";
