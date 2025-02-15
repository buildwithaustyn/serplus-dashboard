'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/components/Toast';

interface APIKeys {
  openai: string;
  claude: string;
  deepseek: string;
  google: string;
}

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    openai: '',
    claude: '',
    deepseek: '',
    google: ''
  });

  useEffect(() => {
    // Load API keys from localStorage on component mount
    setApiKeys({
      openai: localStorage.getItem('openai_api_key') || '',
      claude: localStorage.getItem('claude_api_key') || '',
      deepseek: localStorage.getItem('deepseek_api_key') || '',
      google: localStorage.getItem('google_api_key') || ''
    });
  }, []);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const { showToast, ToastContainer } = useToast();

  const handleApiKeyChange = (provider: keyof APIKeys, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const saveApiKey = (provider: keyof APIKeys) => {
    // Here you would typically save to your backend
    localStorage.setItem(`${provider}_api_key`, apiKeys[provider]);
    showToast(`${provider.charAt(0).toUpperCase() + provider.slice(1)} API key saved successfully`, 'success');
  };

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Required for GPT-4 and GPT-3.5 models'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Required for Claude 3 models'
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      description: 'Required for DeepSeek models'
    },
    {
      id: 'google',
      name: 'Google',
      description: 'Required for Gemini models'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center">
          <FontAwesomeIcon icon={faCog} className="w-6 h-6 mr-2" />
          Settings
        </h1>
      </div>

      <div className="space-y-6">
        {/* API Keys Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">API Keys</h2>
          <div className="space-y-6">
            {providers.map(provider => (
              <div key={provider.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {provider.name}
                </label>
                <p className="text-sm text-gray-500 mb-2">{provider.description}</p>
                <div className="relative">
                  <input
                    type={showKeys[provider.id] ? 'text' : 'password'}
                    value={apiKeys[provider.id as keyof APIKeys]}
                    onChange={(e) => handleApiKeyChange(provider.id as keyof APIKeys, e.target.value)}
                    placeholder={`Enter ${provider.name} API Key`}
                    className="w-full pl-10 pr-20 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <FontAwesomeIcon
                    icon={faKey}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility(provider.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <FontAwesomeIcon icon={showKeys[provider.id] ? faEyeSlash : faEye} />
                    </button>
                    <button
                      onClick={() => saveApiKey(provider.id as keyof APIKeys)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
