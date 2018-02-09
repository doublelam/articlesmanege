import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Main } from "./main";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { VideoMaker } from "./pages/video-maker";
import { Ttes } from "./test";
export const RootRoute = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};

export const MainRoute = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/test" component={Ttes} />
      <Route path="/login" component={Login} />
      <Route path="/make-video" component={VideoMaker} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
};
