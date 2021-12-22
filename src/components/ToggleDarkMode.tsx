import React, { useEffect, useState } from 'react';

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
        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
      </div>
    </label>
  );
};

export default ToggleDarkMode;
