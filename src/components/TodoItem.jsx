import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  toggleTodo,
  removeTodo,
  markCompleted,
  markIncomplete,
  editTodo, // Import editTodo action
} from '../redux/actions';
import { FaTrash, FaCheck, FaTimes, FaEdit, FaSave } from 'react-icons/fa';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setError(''); // Reset error message
  };

  const handleSaveClick = () => {
    if (editText.trim() === '') {
      setError('Todo text cannot be empty');
      return;
    }
    dispatch(editTodo(index, editText.trim()));
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center">
        {isEditing ? (
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <span className={`mr-4 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
        )}
        {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
      </div>
      <div className="flex items-center">
        {isEditing ? (
          <button
            className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded"
            onClick={handleSaveClick}
          >
            <FaSave />
          </button>
        ) : (
          <button
            className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleEditClick}
          >
            <FaEdit />
          </button>
        )}
        <button
          className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash />
        </button>
        {!isEditing && (
          <button
            className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => dispatch(todo.completed ? markIncomplete(index) : markCompleted(index))}
          >
            {todo.completed ? <FaTimes /> : <FaCheck />}
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
