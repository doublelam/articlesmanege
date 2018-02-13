import { CanvasDrawable } from "canvas-drawable";
import {
  Card,
  CardActions,
  CardHeader,
  Dialog,
  DropDownMenu,
  FlatButton,
  FloatingActionButton,
  FontIcon,
  IconButton,
  MenuItem,
  RaisedButton,
  SelectField,
  SvgIcon,
  Toolbar,
  ToolbarGroup,
} from "material-ui";
import {
  AvPlayArrow,
  ContentAdd,
  ContentRemove,
  EditorModeEdit,
  HardwareKeyboardArrowLeft,
  HardwareKeyboardArrowRight,
  NavigationMoreVert,
} from "material-ui/svg-icons";
import * as React from "react";
import { withRouter } from "react-router";
import { SetStylesModal } from "../components/set-styles-modal";
import { VideoPlayerModal } from "../components/video-player-modal";
import {
  Duration,
  ListType,
  WorkerVideoData,
} from "../types/types";
import { ajax, post } from "../utils/ajax";
import { domRect } from "../utils/dom-rect";
import { ImagesManager } from "../webmmaker/images-manager";
import { OperateBit } from "../webmmaker/images-manager";
import { resetCanvas } from "../webmmaker/reset-canvas";
import {
  DEFAULT_DURATIONS,
  DEFAULT_STROKE_STYLE,
} from "../webmmaker/styles-configure";
import { WorkerMessageEvent } from "../workers/handle-images";

interface VideoMakerState {
  containerHeight: string;
  durations: Duration[];
  durationDu: number;
  pageIndex: number;
  strokeWidths: number[];
  strokeWidth: number;
  strokeColors: string[];
  strokeColor: string;
  paintMode: string;
  playerModalOpen: boolean;
  settingModalOpen: boolean;
  playerProgress: number;
  hasData: boolean;
  dataURL: string;
  blob: Blob;
}
interface DomStyles {
  raisedBtn: React.CSSProperties;
  navMoreBtn: React.CSSProperties;
  playFloatBtn: React.CSSProperties;
}

export interface MessagePrePost {
  background: string;
  images: OperateBit[];
}

type ModalOpenKeys = "playerModalOpen" | "settingModalOpen";
type PickModal = Pick<VideoMakerState, ModalOpenKeys>;
export class VideoMaker extends React.Component<{}, VideoMakerState> {
  private canvas: HTMLCanvasElement;
  private drawCanvas: CanvasDrawable;
  private container: HTMLElement;
  private imagesManager: ImagesManager;
  private domStyles: DomStyles;
  private worker: Worker;
  private MODE_MAP: {
    DRAW: () => CanvasDrawable;
    ERASE: () => CanvasDrawable;
  };
  constructor(props) {
    super(props);
    this.imagesManager = new ImagesManager();
    this.state = {
      blob: new Blob(),
      containerHeight: "",
      dataURL: "",
      durationDu: DEFAULT_DURATIONS[0].duration,
      durations: DEFAULT_DURATIONS,
      hasData: false,
      pageIndex: 0,
      paintMode: "DRAW",
      playerModalOpen: false,
      playerProgress: 0,
      settingModalOpen: false,
      strokeColor: DEFAULT_STROKE_STYLE.colors[0],
      strokeColors: DEFAULT_STROKE_STYLE.colors,
      strokeWidth: DEFAULT_STROKE_STYLE.widths[0],
      strokeWidths: DEFAULT_STROKE_STYLE.widths,
    };
    this.domStyles = {
      navMoreBtn: { minWidth: "8vw" },
      playFloatBtn: { position: "fixed", right: 20, bottom: 80, zIndex: 1 },
      raisedBtn: { margin: 0, minWidth: "18vw" },
    };
  }

  public render(): JSX.Element {
    const imgBodies = this.imagesManager.getBodies();
    const previousImg = (imgBodies[this.state.pageIndex - 1] || {
      imageBase64: "",
    }).imageBase64;
    const nextImg = (imgBodies[this.state.pageIndex + 1] || {
      imageBase64: "",
    }).imageBase64;
    return (
      <div style={{ position: "relative" }}>
        <div ref="container" style={{
          display: "flex",
          flexDirection: "column",
          height: this.state.containerHeight,
        }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
            }}
            onTouchMove={e => {
              e.stopPropagation();
            }}
            onMouseMove={e => {
              e.stopPropagation();
            }}
          >
            <canvas style={{ display: "block", position: "relative", zIndex: 1 }} ref="canvas">
              YOUR BROSWER DOES NOT SUPPORT CANVAS
            </canvas>
            <div className="fake-images-contaner">
              <div className="fake-img previous-img">
                <img src={previousImg} />
              </div>
              <div className="fake-img next-img">
                <img src={nextImg} />
              </div>
            </div>
          </div>
          <div className="toobar-container" >
            <Toolbar style={{
              justifyContent: "space-around",
              padding: 0,
            }}>
              {
                [{
                  dom: <RaisedButton
                    style={this.domStyles.raisedBtn}
                    disabled={this.state.pageIndex <= 0}
                    onClick={this.pagePrevious.bind(this)}
                    icon={<HardwareKeyboardArrowLeft />}
                  />,
                }, {
                  dom: <RaisedButton
                    style={this.domStyles.raisedBtn}
                    disabled={
                      this.state.pageIndex >= this.imagesManager
                        .getBodies().length - 1
                    }
                    onClick={this.pageNext.bind(this)}
                    icon={<HardwareKeyboardArrowRight />}
                  />,
                }, {
                  dom: <RaisedButton
                    style={this.domStyles.raisedBtn}
                    onClick={this.addOneBlank.bind(this)}
                    icon={<ContentAdd />}
                  />,
                }, {
                  dom: <RaisedButton
                    style={this.domStyles.raisedBtn}
                    onClick={this.switchDrawOrErase.bind(this)}
                    icon={<EditorModeEdit style={{
                      transform: `rotateZ(${
                        this.state.paintMode === "ERASE" ? 180 : 0
                        }deg)`,
                    }} />}
                  />,
                }, {
                  dom: <IconButton
                    style={this.domStyles.navMoreBtn}
                    onClick={e => {
                      this.switchModalOpen("settingModalOpen", "OPEN");
                    }}
                  >
                    <NavigationMoreVert />
                  </IconButton>,
                }].map((v: { dom: JSX.Element }, i) => (
                  <ToolbarGroup key={i} >
                    {v.dom}
                  </ToolbarGroup>
                ))
              }
            </Toolbar>
          </div>
        </div>
        <FloatingActionButton
          onClick={this.playBtnClick.bind(this)}
          mini
          style={this.domStyles.playFloatBtn}>
          <AvPlayArrow />
        </FloatingActionButton>
        <VideoPlayerModal
          actions={[
            <FlatButton
              label="Cancel"
              primary
              onClick={e => this.switchModalOpen("playerModalOpen", "CLOSE")}
            />,
            <FlatButton
              label="Post"
              primary
              onClick={e => {
                this.postVideo(this.state.hasData, this.state.dataURL, this.state.blob, data => {
                  const props: any = this.props;
                  props.history.push("/video-list");
                });
              }}
            />,
          ]}
          open={this.state.playerModalOpen}
          onRequestClose={ev => {
            this.initiatePlayerModal();
            this.setState({
              playerModalOpen: false,
            });
          }}
          progress={this.state.playerProgress}
          videoData={{
            dataURL: this.state.dataURL,
            hasData: this.state.hasData,
          }}
        />
        <SetStylesModal
          configs={{
            colors: this.state.strokeColors,
            durations: this.state.durations,
            initColor: this.state.strokeColor,
            initDuration: this.state.durationDu,
            initWidth: this.state.strokeWidth,
            widths: this.state.strokeWidths,
          }}
          onCancel={() => {
            this.switchModalOpen("settingModalOpen", "CLOSE");
          }}
          onConfirm={configs => {
            this.setState({
              durationDu: configs.durationDu,
              strokeColor: configs.color,
              strokeWidth: configs.width,
            }, () => {
              this.resetStrokeStyle();
              this.switchModalOpen("settingModalOpen", "CLOSE");
            });
          }}
          open={this.state.settingModalOpen}
          modal={false}
          onRequestClose={v => {
            this.switchModalOpen("settingModalOpen", "CLOSE");
          }}
        />
      </div>
    );
  }

  public componentDidMount(): void {
    this.getDoms();
    this.getStrokeStyles();
    this.resetContainer(() => {
      this.initCanvas();
      this.resetStrokeStyle();
      this.drawOrErase();
      this.preserveCurrent();
      this.setWorker();
    });
  }

  public componentWillUnmount() {
    this.terminateWorker();
  }

  private getDoms(): void {
    this.canvas = this.refs.canvas as HTMLCanvasElement;
    this.container = this.refs.container as HTMLElement;
  }

  private initCanvas(): void {
    resetCanvas(this.canvas);
    this.endrawablecanvas();
  }

  private pagePrevious(): void {
    if (this.state.pageIndex <= 0) {
      return;
    }
    this.preserveCurrent(data => {
      const previousPage = this.state.pageIndex - 1;
      this.setState({
        durationDu: this.imagesManager.getBodies()[previousPage].duration,
        pageIndex: previousPage,
      }, () => {
        this.repaintInPage();
      });
    });
  }

  private pageNext(): void {
    if (this.state.pageIndex >= this.imagesManager.getBodies().length - 1) {
      return;
    }
    this.preserveCurrent(data => {
      const nextPage = this.state.pageIndex + 1;
      this.setState({
        durationDu: this.imagesManager.getBodies()[nextPage].duration,
        pageIndex: nextPage,
      }, () => {
        this.repaintInPage();
      });
    });
  }

  private addOneBlank(): void {
    this.preserveCurrent(this.clearAndInsert);
  }

  private postVideo(hasData: boolean, dataURL: string, blob: Blob, callback?: (data) => any): void {
    if (!hasData) {
      return;
    }
    const formData = new FormData();
    formData.append("videoFile", blob);
    ajax("/make_video_post/send_video_blob", {
      body: formData,
      method: "POST",
    }).then(data => {
      if (callback) {
        callback(data);
      }
    });
  }

  private switchDrawOrErase(): void {
    const currentMode = this.state.paintMode;
    this.setState({
      paintMode: currentMode === "ERASE" ? "DRAW" : "ERASE",
    }, () => {
      this.state.paintMode === "DRAW" ?
        this.drawCanvas.endraw() :
        this.drawCanvas.enerase();
    });
  }

  private playBtnClick(e: React.MouseEvent<void>): void {
    this.preserveCurrent(data => {
      const bodies: MessagePrePost = {
        background: "#fff",
        images: this.imagesManager.getBodies(),
      };
      this.setState({
        playerModalOpen: true,
      }, () => {
        const imgPromises: Array<Promise<OperateBit>> = bodies.images.map(v => {
          return this.regetImagePromise(v, bodies.background);
        });
        Promise.all(imgPromises).then(value => {
          this.worker.postMessage(value);
        });
        this.worker.onmessage = (event: MessageEvent) => {
          const eData: WorkerVideoData = event.data;
          this.setState({
            blob: eData.blob,
            dataURL: eData.videoData.dataURL,
            hasData: eData.videoData.hasData,
            playerProgress: eData.progress,
          });
        };
      });

    });
  }

  private switchModalOpen(
    name: ModalOpenKeys, type?: "OPEN" | "CLOSE",
  ): void {
    const generateState = (iKey: ModalOpenKeys, v: boolean): PickModal => {
      const state = {
        [iKey]: v,
      } as PickModal;
      return state;
    };
    if (type === "OPEN") {
      this.setState(generateState(name, true));
      return;
    }
    if (type === "CLOSE") {
      this.setState(generateState(name, false));
      return;
    }
    this.setState(generateState(name, !this.state[name]));
  }

  private drawOrErase(): void {
    const [DRAW, ERASE] = [this.drawCanvas.endraw, this.drawCanvas.enerase];
    this.MODE_MAP = {
      DRAW,
      ERASE,
    };
    this.MODE_MAP[this.state.paintMode]();
  }

  private clearAndInsert(): void {
    this.drawCanvas.cleanAll();
    const imgBase64 = this.drawCanvas.getCanvasBase64();
    this.drawCanvas.getCanvasBlob().then(data => {
      this.imagesManager.insert(this.state.pageIndex, {
        duration: this.state.durationDu,
        imageBase64: imgBase64,
        imageBuffer: data,
      });
      this.setState({
        pageIndex: this.state.pageIndex + 1,
      });
    });
  }

  private setWorker(): void {
    this.worker = new Worker("static/js/handleImages.js");
  }

  private terminateWorker(): void {
    this.worker.terminate();
  }
  private preserveCurrent(callback?: (val?) => any): void {
    const pageIndex = this.state.pageIndex;
    const imgBase64 = this.drawCanvas.getCanvasBase64("image/webp", 1);
    this.drawCanvas.getCanvasBlob("image/webp", 1).then(data => {
      this.imagesManager.resignBody(pageIndex, {
        duration: this.state.durationDu,
        imageBase64: imgBase64,
        imageBuffer: data,
      });
      return data;
    }).then(data => {
      if (callback) {
        callback.call(this, data);
      }
    });
  }

  private resetContainer(callback?: () => any): void {
    const topGap = domRect(this.container).top;
    this.setState({
      containerHeight: `calc(${window.innerHeight}px - ${topGap}px)`,
    }, () => {
      if (!callback) {
        return;
      }
      callback.call(this);
    });
  }

  private getStrokeStyles(): void {
    post("/make_video_post/get_stroke_styles").then(data => {
      this.setState({
        durationDu: data.content.durations[0].duration,
        durations: data.content.durations,
        strokeColor: data.content.colors[0],
        strokeColors: data.content.colors,
        strokeWidth: data.content.widths[0],
        strokeWidths: data.content.widths,
      }, () => {
        this.resetStrokeStyle();
      });
    });
  }

  private resetStrokeStyle(): void {
    this.drawCanvas.setStyle({
      color: this.state.strokeColor,
      width: this.state.strokeWidth,
    });
  }

  private initiatePlayerModal(): void {
    this.setState({
      dataURL: "",
      hasData: false,
      playerProgress: 0,
    });
  }

  private repaintInPage(): void {
    const [imgBodies, currentPage] = [
      this.imagesManager.getBodies(),
      this.state.pageIndex,
    ];
    this.drawCanvas.cleanAll();
    const img = new Image();
    img.onload = e => {
      this.drawCanvas.native("drawImage",
        img, 0, 0,
      );
    };
    img.src = imgBodies[this.state.pageIndex].imageBase64;
  }

  private regetImagePromise(image: OperateBit, background: string): Promise<OperateBit> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = e => {
        const type = image.imageBase64.match(/^data:(image\/.+);/)[1];
        const [width, height] = [img.width, img.height];
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0);
        const newDataURL = canvas.toDataURL(type);
        const newBlob = canvas.toBlob(rslt => {
          const newImage: OperateBit = {
            duration: image.duration,
            imageBase64: newDataURL,
            imageBuffer: rslt,
          };
          resolve(newImage);
        });
      };
      img.src = image.imageBase64;
    });
  }

  private endrawablecanvas(): void {
    this.drawCanvas = new CanvasDrawable(this.canvas.getContext("2d"));
  }
}
