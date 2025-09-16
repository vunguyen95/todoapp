import "./App.css";
import { useState } from "react";
import TodoList from "./component/TodoList/TodoList";
import Form from "./component/Form/Form";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Math.floor(Math.random() * 10000) }]);
  };

  const handleAdd = () => {
    setIsAdding(!isAdding);
  };
  const handleToggle = (taskID) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskID ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };
  return (
    <>
      <h1> What do you want to do today?</h1>
      <button onClick={handleAdd}> Create a new task </button>

      {isAdding ? <Form onAddTask={addTask} onCancel={handleAdd} /> : null}

      {console.log(tasks)}
      <TodoList tasks={tasks} onToggleTask={handleToggle} />
    </>
  );
}

export default App;
