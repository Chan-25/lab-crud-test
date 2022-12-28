import { Container } from "@material-ui/core";
import React from "react";
import NavBar from "./component/route/NavBar";
import AppRouter from "./component/route/RouterComponent";

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;
