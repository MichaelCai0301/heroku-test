import React, {Fragment} from "react";
import './App.css';

// COMPONENTS 
import Input from "./components/readinput";
import List from "./components/writeoutput";


function App() {
  return (

    <Fragment>
      <div>
        <Input />
        <List />
      </div>
    </Fragment>
  );
}

export default App;
