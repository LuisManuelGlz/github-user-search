import React, { FormEvent, useEffect, useState } from 'react';
import normalizeUrl from 'normalize-url';
import './App.css';
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
import Navigator from './components/Navigator';
import SearchInput from './components/SearchInput';

function App() {
  const [usernameValue, setUsernameValue] = useState<string>('');
  const { user, loading, setUsername } = useGitHubApi('octocat');

  const fetchUserByUsername = async (username: string) => {
    setUsername(username);
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

  return (
    <div className="flex flex-col gap-7 items-center h-screen transition-colors duration-700">
      <Navigator />

      <SearchInput onSubmit={onSubmit} onChange={onChange} loading={loading} />

      {user ? (
        <div className="md:rounded-lg md:shadow-blue w-full md:w-5/6 lg:w-3/4 h-full lg:h-auto bg-gray-100 dark:bg-gray-800 transition-colors duration-700">
          <div className="flex flex-col lg:flex-row items-center lg:items-start p-10">
            <Avatar user={user} />

            <div className="flex flex-col text-center lg:text-left gap-5 lg:ml-10">
              <ProfileName user={user} />

              {user.bio && <ProfileBio bio={user.bio} />}

              <div className="flex flex-wrap gap-4 justify-around md:justify-start dark:text-white transition-colors duration-700">
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
