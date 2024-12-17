import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export const Search = () => {
  const { setFilterString } = useAppContext();

  // State to store the search input value
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );

  // On component mount, set the initial filter string
  useEffect(() => {
    setFilterString(searchValue);
  }, [searchValue, setFilterString]);

  // Handle search input and save to local storage
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    localStorage.setItem('searchValue', value);
    setFilterString(value);
  };

  return (
    <div className="w-full flex justify-end">
      <input
        type="text"
        placeholder="Search..."
        className="w-full lg:w-1/2 p-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};