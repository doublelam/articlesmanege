import { AppBar, Drawer } from "material-ui";
import * as React from "react";
import { MainRoute } from "./router-sets";
interface MainState {
  drawOpen: boolean;
}
export class Main extends React.Component<{}, MainState> {
  public state: MainState;
  constructor(props) {
    super(props);
    this.state = {
      drawOpen: false,
    };
  }
  public render(): JSX.Element {
    return (
      <div>
        <AppBar
          onLeftIconButtonClick={e => {
            this.setState({ drawOpen: !this.state.drawOpen });
          }}
          title="Webm Maker" />
        <Drawer
          docked={false}
          open={this.state.drawOpen}
          onRequestChange={open => {
            this.setState({ drawOpen: open });
          }}
        >
        </Drawer>
        <section>
          <MainRoute />
        </section>
      </div>
    );
  }
}
