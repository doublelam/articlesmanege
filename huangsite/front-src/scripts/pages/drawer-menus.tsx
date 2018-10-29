import {
  Menu,
  MenuItem,
} from "material-ui";
import {
  AvVideoLabel,
  AvVideoLibrary,
} from "material-ui/svg-icons";
import * as React from "react";
import { Link } from "react-router-dom";
export interface DrawerMenusProps {
  switchDrawer: (ifOpen: boolean) => void;
}
export class DrawerMenus extends React.Component<DrawerMenusProps> {
  private domStyles: {
    navLink: React.CSSProperties;
  };
  constructor(props) {
    super(props);
    this.domStyles = {
      navLink: {
        color: "inherit",
        fontSize: "inherit",
        textDecoration: "none",
      },
    };
  }
  public render(): JSX.Element {
    return (
      <nav>
        <Menu
          onChange={e => {
            this.props.switchDrawer(false);
          }}
        >
          <MenuItem
            primaryText={<Link style={this.domStyles.navLink} to="video-list">All Videos</Link>}
            leftIcon={<AvVideoLibrary />}
          />
          <MenuItem
            primaryText={<Link style={this.domStyles.navLink} to="make-video">To Make Video</Link>}
            leftIcon={<AvVideoLabel />} />
        </Menu>
      </nav>
    );
  }
}
