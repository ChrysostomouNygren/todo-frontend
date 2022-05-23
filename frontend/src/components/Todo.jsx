import axios from "axios";
import { useEffect, useState } from "react";


function Todo() {
  const [todos, setTodos] = useState([]);
  const [style, setStyle] = useState(false);

  // fungerar bra.
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

  // fungerar alldeles utmärkt.
  // varför startade jag inte med den här först?!
  function deleteTodo(id) {
    axios.delete(`http://localhost:4000/todos/${id}`);
    console.log(`du lyckades ta bort todon med id:t ${id}`);
  }

  // fungerar mindre bra.
  async function change(done, id) {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      finished: done,
    });
    console.log("patch laddades");
    console.log(`patchen tar emot done som ${done} & idt ${id}`);
  }

  // Måste få till det att vid avbockning av checkbox så sättes den som false igen..
  function reset(done, id) {
    console.log(done, id);
    if (done) {
      console.log(
        `nu ska värdet på done vara satt till true. Är det de: ${done}`
      );
      done = false;
      change(done, id);
      console.log(
        `nu ska värdet på done vara satt till false. Är det de: ${done}`
      );
    } else if (!done) {
      done = true;
      change(done, id);
      console.log(
        `nu ska värdet på done vara satt till true. Är det de: ${done}`
      );
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.finished === true ? true : false}
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
          <h5
            className={style ? "checked" : "check"}
            value={todo.id}
          >
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
