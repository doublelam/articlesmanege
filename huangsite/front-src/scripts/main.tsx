import {
  AppBar,
  Drawer,
} from "material-ui";
import * as React from "react";
import { DrawerMenus } from "./pages/drawer-menus";
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
            this.switchDrawer(true);
          }}
          title="Webm Maker" />
        <Drawer
          docked={false}
          open={this.state.drawOpen}
          onRequestChange={open => {
            this.switchDrawer(false);
          }}
        >
          <DrawerMenus switchDrawer={this.switchDrawer.bind(this)}/>
        </Drawer>
        <section>
          <MainRoute />
        </section>
      </div>
    );
  }

  private switchDrawer(ifOpen: boolean) {
    this.setState({
      drawOpen: ifOpen,
    });
  }
}
