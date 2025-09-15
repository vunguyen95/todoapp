import React, { useState } from 'react';

/* In order to extract the submitted task, we need to pass down a function from App to update */
function Form( {addTask}){
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted:', input);
        addTask(input);
        setInput('');
    }

   return (
    <div className = "form-container"> 
        <form onSubmit = {handleSubmit}>
            <input 
        type = "text" 
        value = {input}
        placeholder = "Enter a task"
        onChange = {handleChange}
            />
            <button type = "submit"> Add Task </button>
        </form>
    </div>
    
   );
}

export default Form;