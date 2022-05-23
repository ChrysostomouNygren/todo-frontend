import axios from "axios";
import { useEffect, useState } from "react";
import Delete from "./Delete";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [donish, setDonish] = useState(false);
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

  async function edit(changedTask, id) {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      task: changedTask,
    });
    console.log("edit laddades.");
  }

  // fungerar mindre bra.
  async function change(done, id) {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      finished: done,
    });
    console.log("patch laddades");
  }

  // Måste få till det att vid avbockning av checkbox så sättes den som false igen..
  function compare(done, id) {
    console.log(`compare done is ${done}`);
    if (done === true) {
      change(done, id);
    } else {
      change(done, id);
      console.log("läses den här av som false? Ja det gör den");
    }
  }
  function reset(done, id) {
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

  const checkedTask = (done, id) => {
    console.log(`klickad! Done är nu satt som ${!done} & idt är ${id}`);
    // setDonish(!donish);
    // compare(!done, id);
    console.log(`donishs value is ${!donish} and dones value is ${!done}`);
  };







  useEffect(() => {
    getTodos();
  }, []);










  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.finished ? true : false}
            // här behöver jag ändra koden... så det går att avbocka...
            // göra den false igen.
            onClick={() => [
              "checked"
                ? reset(todo.finished, todo.id)
                : reset(!todo.finished, todo.id),
              // reset(todo.finished, todo.id)
              // , styledTask(todo.finished, todo.id)
            ]}
            // onChange={() => {
            //   window.location.reload();
            // }}
          />
          <h5
            className={style ? "checked" : "check"}
            value={todo.id}
            // key={todo.id}
          >
            {todo.task}
          </h5>
          {/* edit knapp */}
          <button>edit</button>
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
