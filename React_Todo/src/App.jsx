import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const progress = (completedTasks / todos.length) * 100;

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (index) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (index) => {
    if (window.confirm("Delete the task?")) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  };

  const handleEditTodo = (index) => {
    setIsEditTodo(true);
    setCurrentTodo(index);
    setEditText(todos[index].text);
  };

  const handleUpdateTodo = () => {
    if (editText.trim()) {
      setTodos(todos.map((todo, i) => (i === currentTodo ? { ...todo, text: editText } : todo)));
      setIsEditTodo(false);
      setCurrentTodo(null);
      setEditText("");
    }
  };

  const handleCloseModal = () => {
    setIsEditTodo(false);
    setCurrentTodo(null);
    setEditText("");
  };

  return (
    <>
      <div>
        <div className='input-box'>
          <input type="text" className='input' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add Todo" />
          <button onClick={handleAddTodo} className='add'>
            <i className='bx bx-plus bx-xs' style={{ color: '#ffffff' }}></i>
          </button>
        </div>

        <div className='Info'>
          <div className="task-info">
            <span>{totalTasks} Todos</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className='tasks'>
          {todos.map((todo, index) => (
            <div key={index} className={todo.completed ? "completed" : "task"}>
              <span
                onClick={() => handleToggleTodo(index)}
                className={`custom-checkbox ${todo.completed ? "checked" : ""}`}
              >
                {todo.completed ? (
                  <i className='bx bxs-check-circle bx-md' style={{ color: '#9740ed' }}></i>
                ) : (
                  <i className='bx bxs-circle bx-md' style={{ color: '#e0e0e0' }}></i>
                )}
              </span>
              <h3 className='task-text'>{todo.text}</h3>
              <div>
                <button onClick={() => handleEditTodo(index)} className='edit-btn'>
                  <i className='bx bxs-edit-alt bx-sm' style={{ color: '#2dc944' }}></i>
                </button>
                <button onClick={() => handleDeleteTodo(index)} className='delete-btn'>
                  <i className='bx bxs-trash-alt bx-sm' style={{ color: '#9d9d9d' }}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditTodo && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your task"
              className='edit-input'
            />
            <div className='modal-buttons'>
              <button onClick={handleUpdateTodo} className='save-btn'>Save</button>
              <button onClick={handleCloseModal} className='cancel-btn'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
