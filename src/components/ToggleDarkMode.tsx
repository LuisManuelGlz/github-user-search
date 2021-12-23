import React, { useEffect, useState } from 'react';
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/moon.svg';

const ToggleDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const onToggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      localStorage.theme = 'light';
    } else {
      localStorage.theme = 'dark';
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [darkMode]);

  return (
    <label htmlFor="toggleButton" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggleButton"
          className="sr-only"
          onChange={onToggleDarkMode}
          checked={darkMode}
        />
        <div className="block bg-gray-600 w-14 h-8 rounded-full" />
        <div className="dot absolute left-1 top-1 flex justify-center items-center bg-white w-6 h-6 rounded-full transition">
          {darkMode ? (
            <MoonIcon className="w-4 h-4 fill-current text-gray-600 dark:text-gray-200 transition-colors duration-700" />
          ) : (
            <SunIcon className="w-4 h-4 fill-current text-yellow-300 dark:text-gray-200 transition-colors duration-700" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleDarkMode;
