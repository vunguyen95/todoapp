import React, { useState } from "react";
import "./TodoItem.css";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const maxLength = 20;
function TodoItem({ task, onToggleTask, onDeleteTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const deleteTask = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteTask(task.id);
    }, 300);
  };
  return (
    <div className={`todo-container ${isDeleting ? "slide-out" : ""}`}>
      <div className="todo-card">
        <div className="todo-card-header">
          <div className="todo-textbox">{truncateText(task.text)}</div>
          <div className="todo-detail-box">
            <button className={`priority-${task.priority}`}>{task.priority}</button>
            <button>{task.deadline}</button>
            <img
            className={`icon ${isOpen ? "iconOpen" : " "}`}
            title="Expand Task Details"
            onClick={toggleOpen}
            src="../../public/icon.svg"
          ></img>
          </div>
        </div>
        {isOpen && <div className={`todo-expand`}>
          <h2>{task.text}</h2>
          <div className="todo-description-box">{task.description}</div>
      </div>}
      </div>
        
        

      <button
        onClick={toggleTask}
        className={`toggle-button-${task.isComplete ? "complete" : "incomplete"}`}
        title="Toggle Complete Status"
      >
        {task.isComplete ? <FiCheck /> : <FiX />}
      </button>
      <button className="edit-button" title="Edit Task">
        <FiEdit2 />
      </button>
      <button
        className="delete-button"
        title="Delete Task"
        onClick={deleteTask}
      >
        <FiTrash2 />
      </button>
    </div>
  );
}

export default TodoItem;
