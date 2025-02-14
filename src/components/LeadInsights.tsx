'use client';

import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faEnvelope, 
  faPhone,
  faBuilding,
  faGlobe,
  faIndustry
} from '@fortawesome/free-solid-svg-icons';

interface SearchResult {
  id?: string;
  title: string;
  link: string;
  snippet: string;
  email?: string;
  phone?: string;
}

interface LeadInsightsProps {
  results: SearchResult[];
}

export default function LeadInsights({ results }: LeadInsightsProps) {
  const stats = useMemo(() => {
    const withEmail = results.filter(r => r.email).length;
    const withPhone = results.filter(r => r.phone).length;
    const domains = new Set(results.map(r => new URL(r.link).hostname));
    const industries = new Set(results.map(r => {
      if (r.title.toLowerCase().includes('real estate')) return 'Real Estate';
      if (r.title.toLowerCase().includes('software')) return 'Software';
      if (r.title.toLowerCase().includes('healthcare')) return 'Healthcare';
      if (r.title.toLowerCase().includes('finance')) return 'Finance';
      return 'Other';
    }));

    return {
      totalLeads: results.length,
      contactRate: ((withEmail + withPhone) / (results.length * 2) * 100).toFixed(1),
      uniqueDomains: domains.size,
      industries: industries.size,
      withEmail,
      withPhone
    };
  }, [results]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold opacity-90">Total Leads Found</h3>
          <FontAwesomeIcon icon={faChartLine} className="text-white opacity-75 text-xl" />
        </div>
        <p className="text-3xl font-bold mt-2">{stats.totalLeads}</p>
        <p className="text-sm opacity-75 mt-1">Across {stats.uniqueDomains} unique domains</p>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold opacity-90">Contact Success Rate</h3>
          <div className="flex space-x-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-white opacity-75" />
            <FontAwesomeIcon icon={faPhone} className="text-white opacity-75" />
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{stats.contactRate}%</p>
        <p className="text-sm opacity-75 mt-1">
          {stats.withEmail} emails, {stats.withPhone} phones found
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold opacity-90">Market Coverage</h3>
          <div className="flex space-x-2">
            <FontAwesomeIcon icon={faIndustry} className="text-white opacity-75" />
            <FontAwesomeIcon icon={faGlobe} className="text-white opacity-75" />
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{stats.industries}</p>
        <p className="text-sm opacity-75 mt-1">
          Industries represented
        </p>
      </div>
    </div>
  );
}
