import React, { useState } from "react";
import "./TodoItem.css";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const maxLength = 20;
function TodoItem({ task, onToggleTask }) {
  const [isOpen, setIsOpen] = useState(false);

  const truncateText = (text) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const toggleTask = () => {
    // Toggle the completion status of the task here
    onToggleTask(task.id);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="todo-container">
      <div className="todo-card">
        <div className="todo-textbox">{truncateText(task.text)}</div>
        <div className="todo-detail-box">
          <button>{task.priority}</button>
          <button>{task.deadline}</button>
          <img
            className={`icon ${isOpen ? "iconOpen" : " "}`}
            title="Expand Task Details"
            onClick={toggleOpen}
            src="../../public/icon.svg"
          ></img>
        </div>
      </div>

      <button
        onClick={toggleTask}
        className="toggle-button"
        title="Toggle Complete Status"
      >
        {task.isComplete ? <FiCheck /> : <FiX />}
      </button>
      <button className="edit-button" title="Edit Task">
        {" "}
        <FiEdit2 />{" "}
      </button>
      <button className="delete-button" title="Delete Task ">
        {" "}
        <FiTrash2 />{" "}
      </button>
    </div>
  );
}

export default TodoItem;
