import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Main } from "./main";
import { CoppiesCreator } from "./pages/coppies-creator";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { VideoMaker } from "./pages/video-maker";
import { VideosList } from "./pages/videos-list";
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
      <Route path="/make-video" history={history} component={VideoMaker} />
      <Route path="/video-list" component={VideosList} />
      <Route path="/create-coppies" component={CoppiesCreator} />
      <Redirect from="/" to="/make-video" />
      <Route path="/" component={NotFound} />
    </Switch>
  );
};
