import React from 'react';

type Props = {
  title: string;
  text: string;
  link: string;
};

const ProfileFooterItem = ({ title, text, link }: Props) => {
  return (
    <a className="sm:p-10" href={link} target="_blank" rel="noopener noreferrer">
      <div className="font-bold text-gray-700 dark:text-white transition-colors duration-700">
        {text}
      </div>
      <div className="uppercase text-gray-600 dark:text-gray-400 transition-colors duration-700">
        {title}
      </div>
    </a>
  );
};

export default ProfileFooterItem;
