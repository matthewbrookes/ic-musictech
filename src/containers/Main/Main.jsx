import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Events from "../Events/Events.jsx";
import Home from "../Home/Home.jsx";
import Radio from "../Radio/Radio.jsx";
import Signup from "../Signup/Signup.jsx";

const MainContent = styled.div`
  background-color: #efefef;
  margin: 10px 0 2.5% 0;
  padding-top: 10px;
  border-radius: 4px;
`;

const Main = () => (
  <MainContent>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' component={Events}/>
      <Route exact path='/radio' component={Radio}/>
      <Route exact path='/signup' component={Signup}/>
    </Switch>
  </MainContent>
);

export default Main;
