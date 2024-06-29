// ThemeToggle.jsx (Updated with theme integration)

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/actions';
import '../styles/theme.css'; // Import your theme CSS

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    dispatch(changeTheme(newTheme));
  };

  return (
    <button
      className={`toggle-theme-button ${currentTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      onClick={handleThemeToggle}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
