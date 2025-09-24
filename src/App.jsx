import "./App.css";
import { useState, useCallback, useEffect } from "react";
import TodoList from "./component/TodoList/TodoList";
import Form from "./component/Form/Form";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTask = localStorage.getItem("tasks");
      return storedTask ? JSON.parse(storedTask) : [];
    } catch {
      return [];
    }
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //probably functional update here also
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Math.floor(Math.random() * 10000) }]);
  };

  //too lightweight to use useCallback, and it's not passed down as prop
  const handleAdd = () => {
    setIsAdding(!isAdding);
  };

  const handleClear = () => {
    setTasks([]);
    setIsAdding(false);
    setEditingTask(null);
  };
  const handleToggle = useCallback((taskID) => {
    //use parameter instead of capturing task from outer scope. Function parameters are always fresh.
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskID ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }, []);

  const handleDelete = useCallback((taskID) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID)); // ← Functional update to always get the latest state
  }, []);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const handleEdit = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
  }, []);

  return (
    <>
      <h1> What do you want to do today?</h1>
      <nav className="nav">
        <button onClick={handleAdd}> Create a new task </button>
        <button onClick={handleClear}>Clear all tasks</button>
      </nav>

      {isAdding ? <Form onAddTask={addTask} onCancel={handleAdd} /> : null}

      {editingTask ? (
        <Form
          onAddTask={updateTask}
          onCancel={handleCancelEdit}
          initialTask={editingTask}
          isEditing={true}
        />
      ) : null}

      {/* {console.log(tasks)} */}
      <TodoList
        tasks={tasks}
        onToggleTask={handleToggle}
        onDeleteTask={handleDelete}
        onEditTask={handleEdit}
      />
    </>
  );
}

export default App;
