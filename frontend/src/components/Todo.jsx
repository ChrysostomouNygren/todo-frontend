import axios from "axios";
import { useEffect, useState } from "react";
import Delete from "./Delete";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [styled, setStyled] = useState(false);

  function getTodos() {
    axios
      .get("http://localhost:4000/todos")
      .then((response) => {
        setTodos(response.data.todos);
        console.log(response.data.todos);
      })
      .catch((error) => console.log(error));
    console.log("get laddades in");
  }

  async function change(done, id) {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      finished: done,
    });
    console.log("patch laddades");
  }

  const checkedTask = (done, id) => {
    console.log("klickad!");
    // lägga in en ternery för att ändra mellan true/false?
    change(done, id);

    if (done) {
      console.log(`done is now ${done} at id ${id}`);
      const krisp = {
        // color: "rgba(0, 0, 0, 0.233)",
        textdecoration: "line-through",
      };
    } else {
      console.log(`done is now ${done} at id ${id}`);
    //   const failed = {
    //     color: "black",
    //   };
    }
  };

  //   if todo.finished > styling

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            // checked={todo.finished ? true : false}
            onClick={() => [
              checkedTask(!todo.finished, todo.id),
              //   styledTask(!todo.finished, todo.id),
            ]}
          />
          <h5
            style={checkedTask()}
            value={todo.id}
            // key={todo.id}
          >
            {todo.task}
          </h5>
          {/* edit knapp */}
          {/* delete knapp */}
          <Delete />
        </div>
      ))}
    </div>
  );
}

export default Todo;
