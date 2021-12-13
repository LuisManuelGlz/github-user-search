import React from 'react';
import { User } from '../types/user';

type Props = {
  user: User;
};

const Avatar = ({ user }: Props) => {
  return (
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
  );
};

export default Avatar;
