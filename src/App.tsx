import React, { FormEvent, useEffect, useState } from 'react';
import normalizeUrl from 'normalize-url';
import './App.css';
import { ReactComponent as GitHubLogo } from './assets/icons/logo-github.svg';
import { ReactComponent as SearchIcon } from './assets/icons/search.svg';
import { ReactComponent as LocationIcon } from './assets/icons/location.svg';
import { ReactComponent as TwitterLogo } from './assets/icons/logo-twitter.svg';
import { ReactComponent as GlobeIcon } from './assets/icons/globe.svg';
import { ReactComponent as BusinessIcon } from './assets/icons/business.svg';
import Ballon404Image from './assets/images/ballon404.png';
import { User } from './types/user';
import { useGitHubApi } from './hooks/useGitHubApi';
import Avatar from './components/Avatar';
import ProfileDetail from './components/ProfileDetail';
import ProfileName from './components/ProfileName';
import ProfileFooterItem from './components/ProfileFooterItem';
import ProfileBio from './components/ProfileBio';

function App() {
  const [usernameValue, setUsernameValue] = useState<string>('');
  const { user, loading, setUsername } = useGitHubApi('octocat');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const fetchUserByUsername = async (username: string) => {
    setUsername(username);
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
    await fetchUserByUsername(usernameValue);
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setUsernameValue(value);
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
    <div className="flex flex-col gap-7 items-center h-screen dark:bg-gray-900 transition-colors duration-700">
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

      {user ? (
        <div className="rounded-lg shadow-blue w-3/4 bg-gray-100 dark:bg-gray-800 transition-colors duration-700">
          <div className="flex p-10">
            <Avatar user={user} />

            <div className="flex flex-col gap-5 ml-10">
              <ProfileName user={user} />

              {user.bio && <ProfileBio bio={user.bio} />}

              <div className="flex flex-wrap gap-4 dark:text-white transition-colors duration-700">
                {user.location && (
                  <ProfileDetail
                    icon={
                      <LocationIcon className="w-4 h-4 fill-current text-blue-600" />
                    }
                    text={user.location}
                  />
                )}
                {user.twitter_username && (
                  <ProfileDetail
                    icon={
                      <TwitterLogo className="w-4 h-4 fill-current text-blue-600" />
                    }
                    text={`@${user.twitter_username}`}
                    link={`https://twitter.com/${user.twitter_username}`}
                  />
                )}
                {user.blog && (
                  <ProfileDetail
                    icon={
                      <GlobeIcon className="w-4 h-4 fill-current text-blue-600" />
                    }
                    text={user.blog}
                    link={normalizeUrl(user.blog)}
                  />
                )}
                {user.company && (
                  <ProfileDetail
                    icon={
                      <BusinessIcon className="w-4 h-4 fill-current text-blue-600" />
                    }
                    text={user.company}
                    link={
                      user.company[0] === '@'
                        ? `https://github.com/${user.company.substring(1)}`
                        : ''
                    }
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-around text-center">
            <ProfileFooterItem
              title="Repos"
              text={user.public_repos.toString()}
              link={getRepositoriesUrl(user)}
            />
            <ProfileFooterItem
              title="Following"
              text={user.following.toString()}
              link={getFollowingUrl(user)}
            />
            <ProfileFooterItem
              title="followers"
              text={user.followers.toString()}
              link={getFollowersUrl(user)}
            />
          </div>
        </div>
      ) : (
        user === null && (
          <div className="flex flex-col items-center">
            <img className="w-1/3" src={Ballon404Image} alt="Ballon 404" />
            <h3 className="text-3xl text-blue-600 font-light">
              User couldn't be found
            </h3>
          </div>
        )
      )}
    </div>
  );
}

export default App;
