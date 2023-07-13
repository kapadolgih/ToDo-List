import './App.css';
import { useState } from 'react';

const App = () => {
  const [todo, setTodo] = useState("");  //почему мы помещаем состояние внутрь компонента?
  const [todos, setTodos] = useState([])  //для каждого процесса мы создаём новый хук?
                                          //почему внутри этого состояния пустой массив?
  const addTodo = () => {
    if (todo !== "") {  //это чтобы нельзя было добавить пустое поле
    setTodos([...todos, todo]);  //таким образом будут добавляться элементы в пустой массив Todos?
    setTodo("");  //это тут на что влияет?
    }  //а если элемент будет пустой, то что тогда?
  };

  const deleteTodo = (text) => {  //откуда мы берём параметр text? зачем он тут?
    const newTodos = todos.filter((todo) => {  //почему здесь в качестве аргумента взят todo?
      return todo !== text;  //что он здесь сравнивает (типы данных или значения?) и что он вернёт true или false?
    });
    setTodos(newTodos);  //здесь мы обновляем состояние?
  };

  return (
    <div className='App'>
      <h1> React Todo App </h1>

      <div className='input-wrapper'>  
        <input 
          type='text' 
          name='todo' 
          value={todo}  //это мы передали состояние?
          placeholder='Create a new todo'
          onChange={(e) => {  //обработчик событий, который предоставляет объект event, который используется для получения значения из поля input
            setTodo(e.target.value);  //мы передали состояние обработчику событий, чтобы состояние обновлялось?
          }} 
          />
        
        <button className='add-button' onClick={addTodo}>Add</button>
      </div>

      {todos?.length > 0 ? (   //почему после todos сразу стоит знак "?"
        <ul className='todo-list'>
          {todos.map((todo, index) => (
            <div className='todo'>
              <li key={index}> {todo} </li> 

              <button 
              className='delete-button'
              onClick={() => {
                deleteTodo(todo);
              }}
              >
                Delete</button>
            </div>
          ))}
        </ul>
      ) : (
        <div className='empty'>
          <p>No task found</p>
        </div>
      )}
    </div>
  );
};

export default App;
