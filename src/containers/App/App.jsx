import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Main from "../Main/Main.jsx";
import logo from "../../logo.png";
import "./App.css";

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #efefef;
  border-radius: 5px;
  height: 40px;
  margin: 0 10%;
`;

const StyledLink = styled(Link)`
  color: black;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const LeftSidebar = styled.div`
  width: 25%;
  background-image: url("/left-sidebar.jpg");
  background-size: cover;
`;

const RightSidebar = styled.div`
  width: 25%;
  background-image: url("/right-sidebar.jpg");
  background-size: cover;
`;

class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <div className="App">
                <Wrapper>
                  <LeftSidebar />
                  <div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <Navbar>
                          <StyledLink to='/'>Home</StyledLink>
                          <StyledLink to='/events'>Events</StyledLink>
                          <StyledLink to='/radio'>Musictech on IC Radio</StyledLink>
                        </Navbar>
                    </header>
                    <Main />
                  </div>
                  <RightSidebar />
                </Wrapper>
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
