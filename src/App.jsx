import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Navbar>
                      <StyledLink to='/'>Home</StyledLink>
                    </Navbar>
                </header>
                <Main />
            </div>
        );
    }
}

export default App;
