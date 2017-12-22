import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Events from '../Events/Events.jsx';
import Home from "../Home/Home.jsx";
import Radio from "../Radio/Radio.jsx";

const MainContent = styled.div`
  background-color: #efefef;
  margin: 10px 15% 2.5% 15%;
  padding-top: 10px;
  border-radius: 4px;
  height: 100%;
`;

const Main = () => (
  <MainContent>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' component={Events}/>
      <Route exact path='/radio' component={Radio}/>
    </Switch>
  </MainContent>
);

export default Main;
