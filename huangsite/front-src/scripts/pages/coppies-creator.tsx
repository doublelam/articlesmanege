import { Dialog, FlatButton, RefreshIndicator, TextField } from "material-ui";
import * as React from "react";
import { get, post } from "../utils/ajax";
require("../../styles/copies-creator.sass");

interface CoppiesCreatorState {
  createPopupShow: boolean;
  copiesList: Array<{ id: string, name: string, content: string }>;
  createName: string;
  createContent: string;
  loadingCopies: "ready" | "loading" | "hide";
  ifLoading: boolean;
}
export class CoppiesCreator extends React.Component<{}, CoppiesCreatorState> {
  constructor(props) {
    super(props);
    this.state = {
      copiesList: [],
      createContent: "",
      createName: "",
      createPopupShow: false,
      ifLoading: false,
      loadingCopies: "hide",
    };
  }
  public render(): JSX.Element {
    return (
      <div className="copywrites-section">
        <div style={{
          padding: 20,
          textAlign: "right",
        }}>
          <FlatButton label="Create a copywrite" primary onClick={this.showCreatePopup.bind(this)} />
        </div>
        <div className="copies-wrapper">
          {this.state.copiesList.map(v => (
            <div className="copy-item">
              <div className="copy-name">{v.name}</div>
              <pre className="copy-content">{v.content}</pre>
              <div>
                <FlatButton
                  label="Delete"
                  onClick={this.deleteCopy.bind(this, v.id)}
                />
                {/* <FlatButton
                  label="Edit"
                /> */}
              </div>
            </div>
          ))}
        </div>
        <Dialog
          open={this.state.createPopupShow}
          onTouchCancel={this.cancleCreatePopup}
          actions={
            [<FlatButton
              label="Cancel"
              onClick={this.cancleCreatePopup.bind(this)}
            />,
            <FlatButton
              label="Create"
              primary
              onClick={this.createCoppy.bind(this)}
            />]
          }
        >
          <h1>Coppies Creater</h1>
          <TextField
            id="name_filed"
            placeholder={"Field Name"}
            onChange={(e, v) => {
              this.setState({
                createName: v,
              });
            }}
            multiLine={false}
          />
          <TextField
            id="JSON_field"
            placeholder="JSON format allowed only"
            onChange={(e, v) => {
              this.setState({
                createContent: v,
              });
            }}
            multiLine
            rows={5}
          />

        </Dialog>
        {this.state.ifLoading ? <div style={{
          height: "100%",
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
        }}>
          <div style={{
            height: 50,
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 50,
          }}>
            <RefreshIndicator
              size={50}
              top={0}
              left={0}
              loadingColor="#FF9800"
              status={this.state.loadingCopies}
            />
          </div>
        </div> : null
        }
      </div>);
  }

  public componentDidMount() {
    this.getCopywrites();
  }

  private createCoppy(): void {
    post("common_apis/create_copywrite", {
      content: this.state.createContent,
      name: this.state.createName,
    }).then(data => {
      this.setState({
        createPopupShow: false,
      }, () => {
        this.getCopywrites();
      });
    });
  }

  private deleteCopy(id: string): void {
    post("common_apis/delete_copywrite", { id }).then(data => {
      this.getCopywrites();
    });
  }

  private getCopywrites(): void {
    this.showLoading();
    get("common_apis/get_copywrites").then(data => {
      this.setState({
        copiesList: data.content.copywrites,
      }, () => {
        this.cancelLoading();
      });
    });
  }

  private showLoading(): void {
    this.setState({
      ifLoading: true,
      loadingCopies: "loading",
    });
  }

  private cancelLoading(): void {
    setTimeout(() => {
      this.setState({
        loadingCopies: "hide",
      }, () => {
        setTimeout(() => {
          this.setState({
            ifLoading: false,
          });
        }, 500);
      });
    }, 500);
  }

  private showCreatePopup(): void {
    this.setState({
      createPopupShow: true,
    });
  }

  private cancleCreatePopup(): void {
    this.setState({
      createPopupShow: false,
    });
  }
}
