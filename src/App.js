import './App.css';
import { useState } from 'react'; //подключаем состояние, чтобы отслеживать каждый новый эелемент в списке

const App = () => {  //создаём большой контейнер, куда будут помещены хуки, элементы вёрстки, функции и т.д.
  const [todo, setTodo] = useState("");  //создаём состояние со значением undefined, чтобы установить значение текущего элемент, т.е. пустой элемент, т.е. с помощью этого состояния пользователь может вводить новую задачу в Input
  const [todos, setTodos] = useState([])  //создаём состояние с массивом внутри, чтобы туда помещать новые элементы из todo
  
  const addTodo = () => {
    if (!todo) return; //если todo имеет ложное значение, то выполнение прекращается, т.е. элемент списка не создаётся, если поле пустое
    setTodos((__prevTodo) => {  //создаём функцию с оператором spread внутри
      return [...__prevTodo,todo]  //добавляем новое значение todo в конец списка и возращаем новый массив
    });
    setTodo("");  //поле ввода очищается для следующей задачи (обнуляем значение todo)
  };

  const deleteTodo = (text) => {  //параментр text - это текст задачи, которую необходимо удалить
    const newTodos = todos.filter((todo) => {  //создаётся новый массив newTodos с помощью filter - он проходит по каждому элементу в массиве todos и возвращает новый массив, без удалённого эелемента
      return todo !== text;
    });
    setTodos(newTodos);  //передаётся обновлённый массив задач
  };

  const handleSetTodo = (e) => {  //пишем фукнцию для обработчика событий в input
    const { target: {value ='' } } = e;
    setTodo(value);
  }

  const renderTodoList = () => {
    if (todos?.length > 0) { //проверяем, есть ли свойство длинны у todos с помощь ?. и если есть, то выполняем условия по добавлению элемента списка
      return (
      <ul className='todo-list'>
          {todos.map((todo, index) => (  //перебираем элементы в массиве todos с помощью map и затем отображаем их как li внутри ul
                                        //у map 2 аргумента: todo - элемент, который мы перебираем; index - это индекс элемета todo (используется в качестве ключа li)
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
        );
      } else {  //если длинна =< 0, то выполняем это условие
        return (
          <div className='empty'>
          <p>No task found</p>
        </div>
        );
      }
  };

  return (  //создаём элемент с input, button и списком
    <div className='App'>  
      <h1> React Todo App </h1>

      <div className='input-wrapper'>  
        <input 
          type='text' 
          name='todo' 
          value={todo}  //передаём значение из массива todo, фукнцию для которого мы написали ранее
          placeholder='Create a new todo'
          onChange={handleSetTodo} //обработчик событий, который обновляет состояние todo
          />
        
        <button disabled={!todo} className='add-button' onClick={addTodo}>Add</button>
      </div>

      {renderTodoList()}
      </div>
  );
};

export default App;
