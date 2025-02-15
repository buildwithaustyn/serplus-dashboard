'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTrash, faEnvelope, faPhone, faGlobe, faSearch, faBuilding, faMapMarkerAlt, faIndustry, faDollarSign } from '@fortawesome/free-solid-svg-icons';

interface Lead {
  id: string;
  title: string;
  link: string;
  snippet: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
  industry?: string;
  revenue?: string;
  employees?: string;
  savedAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = leads.filter(lead => 
        lead.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.snippet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.industry?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLeads(filtered);
    } else {
      setFilteredLeads(leads);
    }
  }, [searchTerm, leads]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      setLeads(leads.filter(lead => lead.id !== id));
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Failed to delete lead');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center">
          <FontAwesomeIcon icon={faUsers} className="w-6 h-6 mr-2" />
          Leads
        </h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">No leads saved yet. Use the Lead Scraper to find and save leads.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-blue-600">
                  <a href={lead.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {lead.title}
                  </a>
                </h2>
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Delete lead"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mt-2">{lead.snippet}</p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {lead.email && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
                      <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                        {lead.email}
                      </a>
                    </div>
                  )}
                  
                  {lead.phone && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
                      <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 mr-2" />
                    <a href={lead.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate">
                      {lead.link}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  {lead.company && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faBuilding} className="w-4 h-4 mr-2" />
                      <span>{lead.company}</span>
                    </div>
                  )}
                  
                  {lead.location && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
                      <span>{lead.location}</span>
                    </div>
                  )}
                  
                  {lead.industry && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faIndustry} className="w-4 h-4 mr-2" />
                      <span>{lead.industry}</span>
                    </div>
                  )}

                  {(lead.revenue || lead.employees) && (
                    <div className="flex items-center text-gray-600">
                      <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 mr-2" />
                      <span>
                        {lead.revenue && `Revenue: ${lead.revenue}`}
                        {lead.revenue && lead.employees && ' • '}
                        {lead.employees && `Employees: ${lead.employees}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Saved on {new Date(lead.savedAt).toLocaleDateString()} at{' '}
                {new Date(lead.savedAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
