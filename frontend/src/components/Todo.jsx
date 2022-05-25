import axios from "axios";
import { useEffect, useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);

  // Styling för todo
  const todoStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
  };
  // Styling för färdig todo.
  const style = {
    color: "rgba(0, 0, 0, 0.233)",
    textDecoration: "line-through",
  };
  // Styling för checkboxen
  const boxStyle = {
    accentColor: "black",
  };
  // Styling för knapp
  const deleteButton = {
    background: "transparent",
    border: "0px",
  };

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
    getTodos();
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
      getTodos();
    } else if (!done) {
      done = true;
      change(done, id);
      getTodos();
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} style={todoStyle}>
          {/* Checkbox */}
          <input
            style={boxStyle}
            type="checkbox"
            checked={todo.finished ? true : false}
            onClick={() => [
              "checked"
                ? reset(todo.finished, todo.id)
                : reset(todo.finished, todo.id),
            ]}
          />
          {/* Todo */}
          <h5 style={todo.finished ? style : undefined} value={todo.id}>
            {todo.task}
          </h5>
          {/* <Delete /> */}
          <button
            style={deleteButton}
            onClick={() => {
              [deleteTodo(todo.id)];
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
