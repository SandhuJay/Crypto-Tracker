import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    navigate('/'); // Clear search query
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">Crypto Tracker</Link>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a coin..."
              aria-label="Search"
              className="p-2 rounded-lg"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-2" aria-label="Search Button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 hover:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 11.293a8 8 0 111.414 1.414l4.293 4.293a1 1 0 01-1.414 1.414l-4.293-4.293a8 8 0 01-1.414-1.414zm-1.414 1.414a6 6 0 100-8.485 6 6 0 000 8.485z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-10 top-0 mt-2 mr-2"
                aria-label="Clear Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 hover:text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a1 1 0 00-1 1v6a1 1 0 102 0v-6a1 1 0 00-1-1zM10 3a7 7 0 100 14A7 7 0 0010 3zm0-2a9 9 0 110 18A9 9 0 0110 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
