import "./App.css";
import { useState, useCallback } from "react";
import TodoList from "./component/TodoList/TodoList";
import Form from "./component/Form/Form";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  //probably functional update here also
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Math.floor(Math.random() * 10000) }]);
  };

  //too lightweight to use useCallback
  const handleAdd = () => {
    setIsAdding(!isAdding);
  };
  const handleToggle = useCallback((taskID) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskID ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }, []);

  const handleDelete = useCallback((taskID) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID)); // ← Functional update to always get the latest state
  }, []);
  return (
    <>
      <h1> What do you want to do today?</h1>
      <button onClick={handleAdd}> Create a new task </button>

      {isAdding ? <Form onAddTask={addTask} onCancel={handleAdd} /> : null}

      {console.log(tasks)}
      <TodoList
        tasks={tasks}
        onToggleTask={handleToggle}
        onDeleteTask={handleDelete}
      />
    </>
  );
}

export default App;
