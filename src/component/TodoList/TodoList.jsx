import React, { useState } from 'react';
import './TodoList.css';


function TodoList( {tasks}) {

    return(
        <div className = "todo-list">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key = {task.id} className = "todo-item">
                        <p>{task.text}</p>
                    </div>
                ))
            ) : (
            <p> No tasks yet! Add one </p>
            )}

        </div>
    )
}

export default TodoList;