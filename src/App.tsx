import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import { ReactComponent as GitHubLogo } from './assets/icons/logo-github.svg';
import { ReactComponent as SearchIcon } from './assets/icons/search.svg';
import { ReactComponent as LocationIcon } from './assets/icons/location.svg';
import { ReactComponent as TwitterLogo } from './assets/icons/logo-twitter.svg';
import { ReactComponent as GlobeIcon } from './assets/icons/globe.svg';
import { ReactComponent as BusinessIcon } from './assets/icons/business.svg';
import { User } from './types/user';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const fetchUserByUsername = async (username: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`);
      const user = await response.json();
      setUser(user);
      document.title = `${user.name || user.login} - GitHub Search`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      localStorage.theme = 'light';
    } else {
      localStorage.theme = 'dark';
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchUserByUsername(username);
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setUsername(value);
  };

  const getRepositoriesUrl = (user: User) => {
    return `${user.html_url}?tab=repositories`;
  };

  const getFollowersUrl = (user: User) => {
    return `${user.html_url}?tab=followers`;
  };

  const getFollowingUrl = (user: User) => {
    return `${user.html_url}?tab=following`;
  };

  useEffect(() => {
    fetchUserByUsername('octocat');
  }, []);

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
    <div className="flex flex-col gap-7 items-center h-screen dark:bg-black transition-colors duration-700">
      <nav className="flex items-center justify-between w-full p-7">
        <div className="flex items-center gap-2">
          <GitHubLogo className="w-10 h-10 fill-current text-black dark:text-white transition-colors duration-700" />
          <div className="text-2xl font-light dark:text-white transition-colors duration-700">
            GitHub Search
          </div>
        </div>

        <div>
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              onChange={toggleDarkMode}
              checked={darkMode}
            />
          </label>
        </div>
      </nav>

      <form
        className="flex items-center bg-white dark:bg-blue-600 border-2 dark:border-0 border-blue-600 pl-3 px-1 py-1 rounded-full shadow-xl transition-colors duration-700"
        onSubmit={onSubmit}
      >
        <input
          className="bg-transparent text-blue-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-50 outline-none transition-colors duration-700"
          autoFocus
          type="search"
          required
          placeholder="Search GitHub users"
          onChange={onChange}
        />
        <button
          className="bg-blue-600 dark:bg-white p-2 rounded-full transition-colors duration-700"
          type="submit"
        >
          <SearchIcon className="w-4 h-4 fill-current text-white dark:text-blue-600 transition-colors duration-700" />
        </button>
      </form>

      {user && (
        <div className="rounded-lg shadow-blue w-3/4 dark:bg-gray-900 transition-colors duration-700">
          <div className="flex p-10">
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="rounded-full border-4 border-blue-600 w-40 h-40"
                src={user.avatar_url}
                alt={`${user.name} avatar`}
              />
            </a>

            <div className="flex flex-col gap-5 ml-10">
              <a
                className="group"
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group-hover:underline dark:text-white transition-colors duration-700">
                  {user.login}
                </div>
                <div className="font-bold text-xl text-blue-600">
                  {user.name}
                </div>
              </a>

              {user.bio && (
                <p className="dark:text-white transition-colors duration-700">
                  {user.bio}
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  iure provident aperiam, eaque cupiditate ipsum reiciendis
                  sequi veritatis laborum, aut eligendi nisi magni natus
                  expedita a corporis! Quasi, ducimus fugit. */}
                </p>
              )}

              <div className="flex gap-4 dark:text-white transition-colors duration-700">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <LocationIcon className="w-4 h-4 fill-current text-blue-600" />
                    {user.location}
                  </div>
                )}
                {user.twitter_username && (
                  <div className="flex items-center gap-1">
                    <TwitterLogo className="w-4 h-4 fill-current text-blue-600" />
                    <a
                      className="no-underline hover:underline hover:text-blue-600"
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{user.twitter_username}
                    </a>
                  </div>
                )}
                {user.blog && (
                  <div className="flex items-center gap-1">
                    <GlobeIcon className="w-4 h-4 fill-current text-blue-600" />
                    <a
                      className="no-underline hover:underline hover:text-blue-600"
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.blog}
                    </a>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center gap-1">
                    <BusinessIcon className="w-4 h-4 fill-current text-blue-600" />
                    {user.company[0] === '@' ? (
                      <a
                        className="no-underline hover:underline hover:text-blue-600"
                        href={`https://github.com/${user.company.substring(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.company}
                      </a>
                    ) : (
                      user.company
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-around text-center">
            <a
              className="p-10"
              href={getRepositoriesUrl(user)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-bold text-gray-700 dark:text-white transition-colors duration-700">
                {user.public_repos}
              </div>
              <div className="uppercase text-gray-600 dark:text-gray-400 transition-colors duration-700">
                Repos
              </div>
            </a>
            <a
              className="p-10"
              href={getFollowingUrl(user)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-bold text-gray-700 dark:text-white transition-colors duration-700">
                {user.following}
              </div>
              <div className="uppercase text-gray-600 dark:text-gray-400 transition-colors duration-700">
                Following
              </div>
            </a>
            <a
              className="p-10"
              href={getFollowersUrl(user)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="font-bold text-gray-700 dark:text-white transition-colors duration-700">
                {user.followers}
              </div>
              <div className="uppercase text-gray-600 dark:text-gray-400 transition-colors duration-700">
                Followers
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
