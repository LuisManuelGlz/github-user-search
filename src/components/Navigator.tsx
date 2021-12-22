import React from 'react';
import { ReactComponent as GitHubLogo } from '../assets/icons/logo-github.svg';
import ToggleDarkMode from './ToggleDarkMode';

const Navigator = () => {
  return (
    <nav className="flex items-center justify-between w-full p-7">
      <div className="flex items-center gap-2">
        <GitHubLogo className="w-10 h-10 fill-current text-black dark:text-white transition-colors duration-700" />
        <div className="text-2xl font-light dark:text-white transition-colors duration-700">
          GitHub Search
        </div>
      </div>

      <ToggleDarkMode />
    </nav>
  );
};

export default Navigator;
