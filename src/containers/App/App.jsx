import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Main from "../Main/Main.jsx";
import logo from "../../logo.png";
import "./App.css";

const Navbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #efefef;
  border-radius: 5px;
  min-height: 40px;
  margin: 0 10%;
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

const LeftSidebar = styled.div`
  height: 100%;
  width: 15%;
  top: 0px;
  bottom: 0px;
  left: 0px;
  position: fixed;
`;

const RightSidebar = styled.div`
  height: 100%;
  width: 15%;
  top: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
`;

const Center = styled.div`
  height: 100%;
  width: 70%;
  margin: 0 15%;
`;

const Img = styled.img`
  max-width: 300px;
  width: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Wrapper>
            <LeftSidebar>
              <Img src="/left-sidebar.jpg" />
            </LeftSidebar>
            <Center>
              <header className="App-header">
                <Img src={logo} alt="Logo" />
                <Navbar>
                  <StyledLink to="/">Home</StyledLink>
                  <StyledLink to="/events">Events</StyledLink>
                  <StyledLink to="/radio">Musictech on IC Radio</StyledLink>
                  <StyledLink to="/signup">Weekly Sessions</StyledLink>
                </Navbar>
              </header>
              <Main serverHost={this.props.serverHost} />
            </Center>
            <RightSidebar>
              <Img src="/right-sidebar.jpg" />
            </RightSidebar>
          </Wrapper>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  serverHost: PropTypes.string.isRequired
};

export default App;
