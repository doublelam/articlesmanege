import {
  GridTile, GridTileProps,
} from "material-ui";
import * as React from "React";
export interface SingleVideoProps {
  url: string;
  author?: string;
  description?: string;
  gridTileProps?: GridTileProps;
}
export class SingleVideo extends React.Component<SingleVideoProps> {
  public render(): JSX.Element {
    return (
      <GridTile
        {...this.props.gridTileProps}
      >
        <video style={{
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
        }} controls={false} preload="metadata" src={this.props.url} />
      </GridTile>
    );
  }
}
