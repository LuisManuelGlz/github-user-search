import React, { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  text: string;
  link?: string;
};

const ProfileInfo = ({ icon, text, link }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {icon}
      {link ? (
        <a
          className="no-underline hover:underline hover:text-blue-600"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
};

export default ProfileInfo;
