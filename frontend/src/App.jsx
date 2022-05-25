import axios from "axios";
import { useEffect, useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";

function App() {

  const headerStyle = {
    textAlign: "center",
  }

  return (
    <div>
      <h1 style={headerStyle}>Todozzz</h1>
      <Input />
      <TodoList />
    </div>
  );
}

export default App;
