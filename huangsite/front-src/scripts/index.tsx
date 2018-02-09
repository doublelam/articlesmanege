import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import { render } from "react-dom";
import { RootRoute } from "./router-sets";
/* require style file */
require("../styles/canvas-draw.sass");
class Start extends React.Component {
  public render(): JSX.Element {
    return (
      <MuiThemeProvider>
        <RootRoute />
      </MuiThemeProvider>
    );
  }
}
const container = document.getElementById("root");
render(<Start />, container);
