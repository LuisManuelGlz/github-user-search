import React from 'react';
import { User } from '../types/user';

type Props = {
  user: User;
  loading?: boolean;
};

const Avatar = ({ user: { login, avatar_url, name }, loading }: Props) => {
  if (loading) {
    return <div className="rounded-full bg-blue-400 h-40 w-40" />;
  }

  return (
    <a
      href={`https://github.com/${login}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="rounded-full border-4 border-blue-600 w-40 h-40"
        src={avatar_url}
        alt={`${name} avatar`}
      />
    </a>
  );
};

export default Avatar;
