import Todo from "./Todo";

function TodoList() {
  const box = {
    width: "350px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div style={box}>
      <Todo />
    </div>
  );
}

export default TodoList;
