import React, { useState, useEffect } from 'react';
import { User } from '../types/user';

export const useGitHubApi = (initialUsername: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>(initialUsername);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setError(false);
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error, setUsername };
};
