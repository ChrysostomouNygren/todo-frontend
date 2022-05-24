import axios from "axios";
import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);

  // Styling för färdig todo.
  const style = {
    color: "rgba(0, 0, 0, 0.233)",
    textDecoration: "line-through",
  };

  const todoStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

  // Hämtar todos.
  function getTodos() {
    axios
      .get("http://localhost:4000/todos")
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => console.log(error));
  }

  // Tar bort todos.
  function deleteTodo(id) {
    axios.delete(`http://localhost:4000/todos/${id}`);
  }

  // Ändrar todos i backenden.
  async function change(done, id) {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      finished: done,
    });
  }

  // Funktion som ändrar värdet av todon beroende på checkbox.
  function reset(done, id) {
    if (done) {
      done = false;
      change(done, id);
    } else if (!done) {
      done = true;
      change(done, id);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} style={todoStyle}>
          <input
            type="checkbox"
            checked={todo.finished ? true : false}
            // här behöver jag ändra koden... så det går att avbocka...
            // göra den false igen.
            onClick={() => [
              "checked"
                ? reset(todo.finished, todo.id)
                : reset(todo.finished, todo.id),
            ]}
            onChange={() => {
              window.location.reload();
            }}
          />
          <h5 style={todo.finished ? style : undefined} value={todo.id}>
            {todo.task}
          </h5>
          {/* <Delete /> */}
          <button
            onClick={() => {
              [deleteTodo(todo.id), window.location.reload()];
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
