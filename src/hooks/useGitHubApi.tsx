import React, { useState, useEffect } from 'react';
import { User } from '../types/user';

export const useGitHubApi = (initialUsername: string) => {
  const [user, setUser] = useState<User | null>();
  const [username, setUsername] = useState<string>(initialUsername);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (response.status !== 404) {
          const data = await response.json();
          setUser(data);
          return;
        }

        setUser(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error, setUsername };
};
