import './App.css';
import { useState, useEffect } from 'react'; //подключаем состояние, чтобы отслеживать каждый новый эелемент в списке

const App = () => {  //создаём большой контейнер, куда будут помещены хуки, элементы вёрстки, функции и т.д.
  const [todo, setTodo] = useState("");  //создаём состояние со значением undefined, чтобы установить значение текущего элемент, т.е. пустой элемент, т.е. с помощью этого состояния пользователь может вводить новую задачу в Input
  const [todos, setTodos] = useState([])  //создаём состояние с массивом внутри, чтобы туда помещать новые элементы из todo

  const addTodo = async () => {
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
      setTodos([data, ...todos]);  //обновляем состояние массива с задачами, когда добавляется новая задача
      setTodo("");  //обнуляем состояние до пустой строки
    } catch (error) {
      console.error('Error adding new todo:', error);  //если возникла ошибка, будет введено сообщение в консоль
    }

    //пока закомментирую
    /*setTodos((__prevTodo) => {  //создаём функцию с оператором spread внутри
      return [...__prevTodo,todo]  //добавляем новое значение todo в конец списка и возращаем новый массив
    });
    setTodo("");  //поле ввода очищается для следующей задачи (обнуляем значение todo)*/
    
  };

  const deleteTodo = (e) => {  //параментр text - это текст задачи, которую необходимо удалить
    const { target: { name } } = e;
    console.log(name); // todo id
    // call API delete post by id
    // update todos array - filter by id
    return;
  
    // const newTodos = todos.filter((todo) => {  //создаётся новый массив newTodos с помощью filter - он проходит по каждому элементу в массиве todos и возвращает новый массив, без удалённого эелемента
    //   return todo !== text;
    // });
    // setTodos(newTodos);  //передаётся обновлённый массив задач
  };

  const handleSetTodo = (e) => {  //пишем фукнцию для обработчика событий в input
    const { target: {value ='' } } = e;
    setTodo(value);
  }

  const renderTodoList = () => {
    if (todos.length === 0) {
      return (
        <div className='empty'>
          <p>No task found</p>
        </div>
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
    )
  };

  useEffect(() => {
    console.log('here is useEffect fire mount ');
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await result.json(); 
      console.log('here is fetch result ', data);
      setTodos((__prevData = []) => ([...__prevData, ...data]));
    }
    fetchData();
  }, []);

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

//А что должно было измениться? Изменения должны быть видны? Или мы просто подключились к API для того, чтобы сохранять там данные?
//В чём практические различия между fetch и axios? Что лучше?
//Нужен ли тут хук useEffect?
