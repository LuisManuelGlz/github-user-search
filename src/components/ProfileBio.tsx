import React from 'react';

type Props = {
  bio: string;
};

const ProfileBio = ({ bio }: Props) => {
  return (
    <p className="dark:text-white transition-colors duration-700">
      {bio}
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iure
      provident aperiam, eaque cupiditate ipsum reiciendis sequi veritatis
      laborum, aut eligendi nisi magni natus expedita a corporis! Quasi, ducimus
      fugit. */}
    </p>
  );
};

export default ProfileBio;
