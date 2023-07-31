import './App.css';
import { useState, useEffect } from 'react'; //подключаем состояние, чтобы отслеживать каждый новый эелемент в списке

const App = () => {  //создаём большой контейнер, куда будут помещены хуки, элементы вёрстки, функции и т.д.
  const [todo, setTodo] = useState("");  //создаём состояние со значением undefined, чтобы установить значение текущего элемент, т.е. пустой элемент, т.е. с помощью этого состояния пользователь может вводить новую задачу в Input
  const [todos, setTodos] = useState([])  //создаём состояние с массивом внутри, чтобы туда помещать новые элементы из todo
  const [loading, setLoading] = useState(true);    

  const addTodo = async () => {  //объявление ассинхронной функции
    if (!todo) return; //если todo имеет ложное значение, то выполнение прекращается, т.е. элемент списка не создаётся, если поле пустое

    try {  //здесь мы пытаемся выполнить код, который может сделать ошибку
      const response = await fetch ('https://jsonplaceholder.typicode.com/posts', {  //выполяем POST-запрос к API
        method: 'POST',  //это опции запроса, где указан метод POST, который добавляет новую задачу
        headers: {  //установка заголовков запроса: сервер будет ожидать, что содержимое запроса будет представлено в формате JSON
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({  //тело запроса: перобразовываем его в формат JSON для сервера
          title: todo,
        }),

      });

      const data = await response.json();  //ждём ответ от сервера
      setTodos([...todos, data]);  //обновляем состояние массива с задачами, когда добавляется новая задача
      setTodo("");  //обнуляем состояние до пустой строки
    } catch (error) {
      console.error('Error adding new todo:', error);  //если возникла ошибка, будет введено сообщение в консоль
    }
  };

  
  const deleteTodo = async (e) => {
    const { target: { name } } = e;
    console.log(name);
    try {
      const response = await fetch ('https://jsonplaceholder.typicode.com/posts/${name}', {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== parseInt(name)));  //id возвращается как строка, поэтому мы сравниваем id  числовым значением parseInt(name)
      } else {
        console.error('Failed to delete todo:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSetTodo = (e) => {  //пишем фукнцию для обработчика событий в input
    const { target: {value ='' } } = e;
    setTodo(value);
  }

  const renderTodoList = () => {
    if (todos.length === 0) { //если длинна = 0, то выполняем это условие
      return (
        <div className="loader"></div>
      )
    }
    
    return (
      <ul className='todo-list'>
          {todos.map((todo) => (  //перебираем элементы в массиве todos с помощью map и затем отображаем их как li внутри ul
                                  //у map 2 аргумента: todo - элемент, который мы перебираем; index - это индекс элемета todo (используется в качестве ключа li)
            <div className='todo' key={todo.id}>
              <li> {todo.title} </li> 

              <button 
              className='delete-button'
              name={todo.id}
              onClick={deleteTodo}
              >
                Delete</button>
            </div>
          ))}
        </ul>
        );
      };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await result.json();
      setTodos((__prevData = []) => ([...data, ...__prevData]));
      setLoading(false);
    }
    fetchData();
  }, []);  //пустой массив - код внутри useEffect будет выполнен только один раз при рендере компонента

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
