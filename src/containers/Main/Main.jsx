import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import AdminEvents from "../AdminEvents/AdminEvents.jsx";
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

const Main = ({ serverHost }) => (
  <MainContent>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/events' render={() => <Events serverHost={serverHost} />}/>
      <Route exact path='/radio' component={Radio}/>
      <Route exact path='/signup' render={() => <Signup serverHost={serverHost} />}/>
      <Route exact path='/admin/events' render={() => <AdminEvents serverHost={serverHost} />}/>
    </Switch>
  </MainContent>
);

Main.propTypes = {
  serverHost: PropTypes.string.isRequired,
};

export default Main;
