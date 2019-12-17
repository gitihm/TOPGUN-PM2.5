import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";

import SensorDataReceiverScreen from "./screens/SensorDataReceiver";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            LoRa IoT by CAT Example
          </h5>
        </div>

        <Route exact path="/" component={SensorDataReceiverScreen} />
      </div>
    );
  }
}

export default App;
