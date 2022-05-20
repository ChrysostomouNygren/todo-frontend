import axios from "axios";
import { useEffect, useState } from "react";

import Input from "./components/Input";
import TodoList from "./components/TodoList";

function App() {


  return (
    <div>
      <h1>Todozzz</h1>
      <Input />
      <TodoList />
    </div>
  );
}

export default App;
