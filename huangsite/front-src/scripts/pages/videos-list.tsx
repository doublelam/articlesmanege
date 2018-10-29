import {
  GridList,
} from "material-ui";
import * as React from "react";
import { SingleVideo } from "../components/single-video";
import { VideoPlayerModal } from "../components/video-player-modal";
import { get } from "../utils/ajax";
import { domRect } from "../utils/dom-rect";
export interface VideoDescription {
  url: string;
  updateTime: string;
}
export interface VideosListState {
  videos: VideoDescription[];
  modalOpen: boolean;
  tempVideo: VideoDescription;
  containerHeight: string;
}

export class VideosList extends React.Component<{}, VideosListState> {
  public state: VideosListState;
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: "auto",
      modalOpen: false,
      tempVideo: void 0,
      videos: [],
    };
  }
  public render(): JSX.Element {
    return (
      <div ref="container" style={{
        backgroundColor: "rgba(0, 0, 0, .1)",
        height: this.state.containerHeight,
        overflow: "auto",
      }} >
        <GridList>
          {this.state.videos.map((v, i) => <SingleVideo
            gridTileProps={{
              onClick: e => {
                this.setState({
                  modalOpen: true,
                  tempVideo: v,
                });
              },
              title: <span>{v.updateTime}</span>,
            }}
            key={"key" + i}
            url={v.url}
          />)}
        </GridList>
        <VideoPlayerModal
          progress={100}
          videoData={{
            dataURL: (this.state.tempVideo || { url: "" }).url,
            hasData: true,
          }}
          open={this.state.modalOpen}
          onRequestClose={() => {
            this.setState({
              modalOpen: false,
            });
          }}
        />
      </div>
    );
  }

  public componentDidMount(): void {
    this.getVideos();
    this.recalculateHeight();
  }

  public getVideos(): void {
    get("/make_video_post/get_videos").then(data => {
      this.setState({
        videos: data.content.videos.map(v => ({
          updateTime: v.update_time,
          url: v.url,
        })),
      });
    });
  }

  private recalculateHeight(): void {
    const top = domRect(this.refs.container as HTMLElement).top;
    this.setState({
      containerHeight: `calc(100vh - ${top}px)`,
    });
  }
}
