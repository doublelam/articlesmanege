import * as Whammy from "whammy";
import { MessagePrePost } from "../pages/video-maker";
import { WorkerVideoData } from "../types/types";
import { OperateBit } from "../webmmaker/images-manager";
export interface WorkerMessageEvent extends MessageEvent {
  data: MessagePrePost["images"];
}
class HandleImages {
  private it: any;
  constructor() {
    this.it = self;
  }
  public start(): void {
    this.it.onmessage = this.onMessage.bind(this);
  }

  private onMessage(e: WorkerMessageEvent): void {
    const video = this.getWebmVideo(e.data);
    const url = this.it.URL.createObjectURL(video);
    const data: WorkerVideoData = {
      blob: video,
      progress: 100,
      videoData: {
        dataURL: url,
        hasData: true,
      },
    };
    this.it.postMessage(data);
  }

  private getWebmVideo(data: WorkerMessageEvent["data"]) {
    const whammyVideo = new Whammy.Video();
    const len = data.length;
    data.forEach((val, i) => {
      whammyVideo.add(val.imageBase64, val.duration);
      const pData: WorkerVideoData = {
        progress: (i + 1) / len * 100,
        videoData: {
          dataURL: "",
          hasData: false,
        },
      };
      this.it.postMessage(pData);
    });
    const video: Blob = whammyVideo.compile();
    return video;
  }

}

const main = () => {
  const handleImages = new HandleImages();
  handleImages.start();
};

main();
