import React, { useState, useCallback, useEffect } from "react";
import "./Form.css";

/* In order to extract the submitted task, we need to pass down a function from App to update */
function Form({ onAddTask, onCancel, isEditing = false, initialTask = {} }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (isEditing && initialTask) {
      setTaskName(initialTask.text);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setDeadline(initialTask.deadline);
    }
  }, [isEditing, initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent reloading.
    if (taskName.trim() === "") return;
    const newTask = {
      text: taskName,
      description: description,
      priority: priority,
      deadline: deadline,
      isComplete: false,
    };
    if (isEditing) {
      newTask.id = initialTask.id;
    }
    onAddTask(newTask);
    onCancel();
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="task-name"> Task Name </label>
      <input
        id="task-name"
        type="text"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      ></input>
      <label htmlFor="description"> Description </label>{" "}
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="priority"> Priority </label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value=""> -- Select Priority -- </option>
        <option value="low"> Low </option>
        <option value="moderate"> Moderate</option>
        <option value="high"> High </option>
        <option value="urgent"> Urgent</option>
      </select>
      <label htmlFor="deadline"> Deadline</label>
      <input
        id="deadline"
        type="time"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        onClick={(e) => e.target.showPicker && e.target.showPicker()}
      ></input>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit"> {isEditing ? "Update Task" : "Add Task"} </button>
    </form>
  );
}

export default Form;
