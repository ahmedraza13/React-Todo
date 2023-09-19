import { useState, useRef, } from 'react'
import Header from './Components/Header/Header'
import Button from './Components/Button/Button';
import './App.css'


const App = () => {

    const todoValue = useRef(null)
    const [todos, setTodos] = useState([]);
    const [editTodoValue, setEditTodoValue] = useState("");

    const addTodo = () => {
      const todoObj = {
        value: todoValue.current.value,
        
      };
    
      // Create a new array by spreading the previous todos array and adding the new todoObj to it
      const newTodos = [...todos, todoObj];
    
    
      // Set the state with the new array
      setTodos(newTodos);
      todoValue.current.value = ""
       
       
    }

    const deleteAllTodo = () => {
      setTodos([]);
   }

   const deleteTodo = (index) => {
   todos.splice(index, 1);
    setTodos([...todos]);
  };

   const editTodo = (index) => {
    todos.forEach((todo) => {
      todo.isEdit = false;
    });
      todos[index].isEdit = true
      setTodos([...todos]);
      setEditTodoValue(todos[index].value);
   }

   const saveTodoValue = (index) => {
    console.log("editTodoValue", editTodoValue);
    todos[index].value = editTodoValue;
    todos[index].isEdit = false;
    setTodos([...todos]);
  };
   
    return (
        <>
        
        <Header/>
        <div className=" flex justify-center  items-center mt-5 flex-col">
        <div className="w-[70%]">
           <input 
            type="text" 
            placeholder='Enter todo value'
            className='border w-full rounded-lg p-3 ouline-none  border-gray-600' 
            ref={todoValue}
            />
          </div>

          <div className="flex mt-10">
            <Button 
            title= "Add Todo"
            clickTrigger={addTodo}
            />

            <Button
            title="Delete All"
            clickTrigger={deleteAllTodo}
            customClass="bg-red-500"/>
          </div>
        </div>

       
     
       
       
       <div className=' w-[70%] mx-auto mt-5'>
        <ul>
        {
          todos.map((todo, index) => {
            return   todo.isEdit ? (
              <div className="flex  mx-auto" key={index}>
                <input
                  type="text"
                  className="border w-full rounded-lg p-3 outline-none border-gray-600 "
                  onChange={(e) => setEditTodoValue(e.target.value)}
                  value={editTodoValue}
                />
                <Button
                  title="Save"
                  clickTrigger={() => saveTodoValue(index)}
                 
                />
              </div>
            ):
             (
              <li key={index} 
              className="text-xl p-3 border rounded-lg flex justify-between items-center">
              {todo.value}
              <div>
                <Button title="EDIT" clickTrigger={() => editTodo(index)}/>
                <Button title="Delete" clickTrigger={() => deleteTodo(index)} customClass="bg-red-500"/>
              </div>
              </li>
            )
          }) 
        }
        </ul>
        </div>
        </>
    )
}

export default App