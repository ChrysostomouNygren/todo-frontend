import Todo from "./Todo";
import gridPaper from "../resources/grid.jpg";

function TodoList() {
  const box = {
    width: "350px",
    minHeight: "300px",
    marginBottom: "40px",
    marginTop: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    background: `url(${gridPaper})`,
    borderRadius: "5%",
    border: "2px",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.233)",
  };

  return (
    <div style={box}>
      <Todo />
    </div>
  );
}

export default TodoList;
