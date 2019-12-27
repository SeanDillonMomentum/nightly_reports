import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import AppRouter from "./routers/AppRouter";

export const Context = React.createContext({});

const theme = {
  lightBlue: "#3cc7fa",
  midnightBlue: "#001649",
  lightSteelBlue: "#E3E9EE",
  momentumBlue: "#00aeef",
  slateGrey: "#6f7d8B",
  cadetBlue: "#658eb3",
  challengeGreen: "#49B54A",
  alertRed: "#FF0000",
  backgroundDarkGrey: "#f5f5f5",
  backgroundLightGrey: "#e5e5e5",
  font: "Roboto, sans-serif"
};

const App = () => {
  const [state, setState] = useState("Orlando");
  return (
    <Context.Provider value={{ state, setState }}>
      <ThemeProvider theme={theme}>
        <div className="App-container">
          <AppRouter />
        </div>
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
