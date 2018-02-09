import {
  Dialog,
  DialogProps,
  LinearProgress,
} from "material-ui";
import {
  ImageMovieCreation,
} from "material-ui/svg-icons";
import * as React from "react";
export interface VideoPlayerModalProps extends DialogProps {
  progress: number;
  videoData: {
    hasData: boolean;
    dataURL?: string;
  };
}
export class VideoPlayerModal extends React.Component<VideoPlayerModalProps> {
  constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    const content = this.props.videoData.hasData ?
      <div>
        <video loop autoPlay style={{
          height: "100%",
          width: "100%",
        }} src={this.props.videoData.dataURL} controls ></video>
      </div> :
      <div>
        <div>
          <div>
            <ImageMovieCreation style={{ width: "100%", height: "100%" }} />
          </div>
          <div>
            <LinearProgress
              mode={this.props.progress <= 0 ? "indeterminate" : "determinate"}
              value={this.props.progress}
            />
          </div>
        </div>
      </div>;
    return <Dialog
      onRequestClose={this.props.onRequestClose}
      open={this.props.open}
      contentStyle={{
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {content}
    </Dialog>;
  }
}
