import './App.css'
import { useState } from 'react'
import TodoList from './component/TodoList/TodoList'
import Form from './component/Form/Form'

function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Math.floor(Math.random()* 10000),
      text: text,
      isCompleted: false
    };
    setTasks([...tasks, newTask])
  }

  return (
    <>
      <h1> What do you want to do today?</h1>
      {console.log(tasks)}
      <Form addTask = {addTask}/>
      <TodoList tasks = {tasks}/>
    </>
  )
}

export default App

