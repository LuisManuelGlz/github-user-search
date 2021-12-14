import React from 'react';
import { User } from '../types/user';

type Props = {
  user: User;
};

const ProfileName = ({ user: { login, name } }: Props) => {
  return (
    <a
      className="group"
      href={`https://github.com/${login}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="group-hover:underline dark:text-white transition-colors duration-700">
        {login}
      </div>
      <div className="font-bold text-xl text-blue-600">{name}</div>
    </a>
  );
};

export default ProfileName;
