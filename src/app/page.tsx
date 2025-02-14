'use client';

import { useTheme } from '@/contexts/ThemeContext';
import StatsCard from '@/components/StatsCard';
import { LeadTrendsChart, LeadSourcesChart } from '@/components/Charts';
import { faUsers, faChartLine, faBullhorn } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value="2,547"
          change="+12.5% from last month"
          icon={faUsers}
          iconBgColor="bg-blue-100 dark:bg-blue-900/50"
          iconColor="text-blue-600 dark:text-blue-300"
        />
        <StatsCard
          title="Conversion Rate"
          value="4.8%"
          change="+2.1% from last month"
          icon={faChartLine}
          iconBgColor="bg-green-100 dark:bg-green-900/50"
          iconColor="text-green-600 dark:text-green-300"
        />
        <StatsCard
          title="Active Campaigns"
          value="12"
          change="3 ending soon"
          icon={faBullhorn}
          iconBgColor="bg-purple-100 dark:bg-purple-900/50"
          iconColor="text-purple-600 dark:text-purple-300"
        />
        <StatsCard
          title="AI Lead Score"
          value="85"
          change="High quality leads"
          icon={faUsers}
          iconBgColor=""
          iconColor=""
          isAiScore
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadTrendsChart isDark={isDark} />
        <LeadSourcesChart isDark={isDark} />
      </div>

      {/* Recent Leads Table */}
      <div className="dashboard-card p-6 bg-white dark:bg-[#262A30] border border-gray-200 dark:border-[#363A3F]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent High-Value Leads</h3>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="pb-4">Name</th>
                <th className="pb-4">Company</th>
                <th className="pb-4">AI Score</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4 text-gray-900 dark:text-white">Sarah Connor</td>
                <td className="text-gray-900 dark:text-white">Cyberdyne Systems</td>
                <td>
                  <div className="flex items-center text-gray-900 dark:text-white">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    92
                  </div>
                </td>
                <td>
                  <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300">
                    In Progress
                  </span>
                </td>
                <td>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
