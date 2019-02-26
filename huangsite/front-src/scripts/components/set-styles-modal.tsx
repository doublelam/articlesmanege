import {
  Dialog,
  DialogProps,
  FlatButton,
  MenuItem,
  SelectField,
  SelectFieldProps,
} from "material-ui";
import { ContentRemove } from "material-ui/svg-icons";
import * as React from "react";
import { isCongruence } from "recursive-methods";
import {
  Duration,
  ListType,
} from "../types/types";
import {
  DEFAULT_DURATIONS,
  DEFAULT_STROKE_STYLE,
} from "../webmmaker/styles-configure";
interface Configs {
  initWidth?: number;
  widths?: number[];
  initColor?: string;
  colors?: string[];
  initDuration?: number;
  durations?: Duration[];
  page?: number;
}
interface SetStylesModalProps extends DialogProps {
  configs?: Configs;
  onCancel?: () => any;
  onConfirm?: (data: {
    width: number,
    color: string,
    durationDu: number,
  }) => any;
}

interface SetStylesModalState {
  width: number;
  color: string;
  durationDu: number;
  widths: number[];
  colors: string[];
  durations: Duration[];
}
type SelectValue = string | number | Duration;
interface EleType {
  fieldProps: SelectFieldProps;
  items: ListType<SelectValue>;
  key: (value: SelectValue) => any;
  val: (value: SelectValue) => any;
  label: (value: SelectValue) => JSX.Element;
}
export class SetStylesModal extends React.Component<SetStylesModalProps, SetStylesModalState> {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.configs.initColor || DEFAULT_STROKE_STYLE.colors[0],
      colors: this.props.configs.colors || DEFAULT_STROKE_STYLE.colors,
      durationDu: this.props.configs.initDuration || DEFAULT_DURATIONS[0].duration,
      durations: this.props.configs.durations || DEFAULT_DURATIONS,
      width: this.props.configs.initWidth || DEFAULT_STROKE_STYLE.widths[0],
      widths: this.props.configs.widths || DEFAULT_STROKE_STYLE.widths,
    };
  }
  public render(): JSX.Element {
    const eleSeries: EleType[] = [{
      fieldProps: {
        floatingLabelText: "Line Width: ",
        onChange: (e, i, v: number) => {
          this.setState({
            width: v,
          });
        },
        value: this.state.width,
      },
      items: this.props.configs.widths as ListType<SelectValue> || DEFAULT_STROKE_STYLE.widths,
      key: val => val,
      label: (value: any): JSX.Element => <div><ContentRemove style={{
        transform: `scaleY(${value * .5})`,
        verticalAlign: "middle",
      }} />{value}px</div>,
      val: val => val,
    }, {
      fieldProps: {
        floatingLabelText: "Line Colour",
        onChange: (e, i, v: string) => {
          this.setState({
            color: v,
          });
        },
        value: this.state.color,
      },
      items: this.props.configs.colors as ListType<SelectValue> || DEFAULT_STROKE_STYLE.colors,
      key: val => val,
      label: (value): JSX.Element => <div style={{ width: "100%" }}>
        <div style={{
          backgroundColor: String(value),
          borderRadius: 3,
          color: "#eee",
          display: "inline-block",
          lineHeight: 1.5,
          margin: "auto",
          padding: "0 10px",
          textShadow: "1px 1px 0 #333",
          verticalAlign: "middle",
          width: "100%",
        }}><span>{value}</span></div>
      </div>,
      val: val => val,
    }, {
      fieldProps: {
        floatingLabelText: "Current Duration",
        onChange: (e, i, v: number) => {
          this.setState({
            durationDu: v,
          });
        },
        value: this.state.durationDu,
      },
      items: this.props.configs.durations as ListType<SelectValue> || DEFAULT_DURATIONS,
      key: (val: Duration) => val.name,
      label: (value: Duration): JSX.Element => <div>
        {value.name} ({value.duration} Miliseconds per frame)
      </div>,
      val: (val: Duration) => val.duration,
    }];
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={e => {
          if (this.props.onCancel) {
            this.props.onCancel();
          }
        }}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={e => {
          if (this.props.onConfirm) {
            this.props.onConfirm(this.getConfigs());
          }
        }}
      />,
    ];
    return <Dialog
      open={this.props.open}
      actions={actions}
      onRequestClose={this.props.onRequestClose}
    >
      {eleSeries.map((v, i) => <SelectField

        style={{ width: "100%" }}
        key={i}
        {...v.fieldProps}
      >
        {
          v.items.map(val => {
            const labelTxt: JSX.Element = v.label(val);
            return <MenuItem
              key={v.key(val)}
              value={v.val(val)}
              label={labelTxt}
              primaryText={labelTxt}
            />;
          })
        }
      </SelectField>)}
    </Dialog>;
  }
  public componentWillReceiveProps(nextprops: SetStylesModalProps): void {
    this.judgeIfConfigeChange(nextprops);
  }

  private initializeStyles(props: SetStylesModalProps, callback?: () => any): void {
    this.setState({
      color: props.configs.initColor,
      colors: props.configs.colors,
      durationDu: props.configs.initDuration,
      durations: props.configs.durations,
      width: props.configs.initWidth,
      widths: props.configs.widths,
    }, () => {
      if (callback) {
        callback();
      }
    });
  }

  private getConfigs(): { color: string, durationDu: number, width: number } {
    return {
      color: this.state.color,
      durationDu: this.state.durationDu,
      width: this.state.width,
    };
  }

  private judgeIfConfigeChange(props: SetStylesModalProps): void {
    const [currentConfig, propsConfig] = [this.getConfigs(), {
      color: props.configs.initColor,
      durationDu: props.configs.initDuration,
      width: props.configs.initWidth,
    }];
    if (isCongruence(currentConfig, propsConfig)) {
      return;
    }
    this.initializeStyles(props);
  }
}
