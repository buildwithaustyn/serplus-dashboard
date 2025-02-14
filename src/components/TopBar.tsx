'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faMoon, faSun, faBell, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/contexts/ThemeContext';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-[#262A30] shadow-sm p-4 flex justify-between items-center border-b border-gray-200 dark:border-[#363A3F]">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search leads, campaigns..."
            className="w-64 px-4 py-2 rounded-lg bg-white dark:bg-[#1E2024] border border-gray-200 dark:border-[#363A3F] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className={theme === 'dark' ? 'text-yellow-400' : ''} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative text-gray-600 dark:text-gray-300">
          <FontAwesomeIcon icon={faBell} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
      </div>
    </div>
  );
}
