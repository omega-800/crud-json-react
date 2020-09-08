import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddStuff from "./components/add-stuff.component";
import Stuff from "./components/stuff.component";
import StuffList from "./components/stuff-list.component";

class App extends Component{
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/stuff" className="navbar-brand">
            Stuff
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/stuff"} className="nav-link">
                Stuff
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/stuff"]} component={StuffList} />
            <Route exact path="/add" component={AddStuff} />
            <Route path="/stuff/:id" component={Stuff} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
