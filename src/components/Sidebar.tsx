'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faRobot, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <nav className="w-64 bg-white dark:bg-[#262A30] border-r border-gray-200 dark:border-[#363A3F] h-screen">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Image
          src="https://res.cloudinary.com/dolij7wjr/image/upload/v1739526192/SERPlus_ga1u4w.png"
          alt="SERPLUS"
          width={128}
          height={32}
          style={{ width: 'auto', height: '32px' }}
          priority
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Image
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="John Doe"
            width={40}
            height={40}
            className="rounded-full"
            style={{ width: '40px', height: '40px' }}
          />
          <div className="ml-3">
            <p className="font-semibold dark:text-white">John Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enterprise Admin</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link href="#" className="flex items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
            <FontAwesomeIcon icon={faChartLine} className="w-5" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faUsers} className="w-5" />
            <span className="ml-3">Leads</span>
          </Link>
          <Link href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faRobot} className="w-5" />
            <span className="ml-3">AI Insights</span>
          </Link>
          <Link href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
            <FontAwesomeIcon icon={faCog} className="w-5" />
            <span className="ml-3">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
