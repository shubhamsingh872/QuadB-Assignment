import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import { addTodo, updateSearchTerm, setTodos } from '../redux/actions';

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
      setError('');
    } else {
      setError('Todo text cannot be empty!');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>Personal TODO APP</h2>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className={`flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => { setNewTodoText(e.target.value); setError(''); }}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20}/>
          </button>
        </div>
      </div>

      <TodoList />
      <footer className="mt-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Shubham Kumar ❤️</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/shubham-kumar-8295bb227/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/shubhamsingh872"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-900"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Todo;
