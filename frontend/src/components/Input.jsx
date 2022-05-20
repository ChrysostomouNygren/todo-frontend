import { useState } from "react";
import axios from "axios";

// POST

function Input() {
  const [todo, setTodo] = useState("");
  //   const [todos, setTodos] = useState([]);

  async function newTodo() {
    await axios.post("http://localhost:4000/todos", {
      task: todo,
    });
  }

  function clearForm() {
    setTodo("");
  }

  return (
    <form>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        autoFocus
      />
      <button onClick={() => [clearForm(), newTodo()]}>Lägg till</button>
    </form>
  );
}

export default Input;
