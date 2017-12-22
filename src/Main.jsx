import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Events from './Events.jsx';
import Home from "./Home.jsx";

const MainContent = styled.div`
  background-color: #efefef;
  margin: 0 15%;
  border-radius: 4px;
`;

const Main = () => (
  <MainContent>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' component={Events}/>
    </Switch>
  </MainContent>
);

export default Main;
