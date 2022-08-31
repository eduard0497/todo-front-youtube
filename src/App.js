import React, { useState } from "react";
import RegLog from "../src/comps/RegLog";
import ToDoPage from "../src/comps/ToDoPage";
import "./App.css";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <div className="app_container">
      {userLoggedIn ? (
        <ToDoPage setUserLoggedIn={setUserLoggedIn} />
      ) : (
        <RegLog setUserLoggedIn={setUserLoggedIn} />
      )}
    </div>
  );
}

export default App;
