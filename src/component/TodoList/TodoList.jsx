import React, { useState } from "react";
import "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";
function TodoList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="todo-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      ) : (
        <p> No tasks yet! Add one </p>
      )}
    </div>
  );
}

export default TodoList;
