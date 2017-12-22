import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main.jsx";
import logo from "./logo.png";
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

class App extends Component {
    render() {
        return (
          <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Navbar>
                      <StyledLink to='/'>Home</StyledLink>
                      <StyledLink to='/events'>Events</StyledLink>
                    </Navbar>
                </header>
                <Main />
            </div>
          </BrowserRouter>
        );
    }
}

export default App;
