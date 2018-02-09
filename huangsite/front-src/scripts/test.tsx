import * as React from "react";
interface Test {
  test?: string;
  nn?: number;
}
export class Ttes extends React.Component<Test> {
  public render(): JSX.Element {
    return <div><h1>Testhhhh</h1></div>;
  }
}
