import React, { FormEvent } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as LoaderIcon } from '../assets/icons/loader.svg';

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  loading: boolean;
  value: string;
};

const SearchInput = ({ onSubmit, onChange, loading, value }: Props) => {
  return (
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
        value={value}
      />
      <button
        className="bg-blue-600 dark:bg-white p-2 rounded-full transition-colors duration-700"
        type="submit"
      >
        {loading ? (
          <LoaderIcon className="animate-spin w-4 h-4 fill-current text-white dark:text-blue-600 transition-colors duration-700" />
        ) : (
          <SearchIcon className="w-4 h-4 fill-current text-white dark:text-blue-600 transition-colors duration-700" />
        )}
      </button>
    </form>
  );
};

export default SearchInput;
