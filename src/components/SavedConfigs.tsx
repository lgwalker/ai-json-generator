import React from 'react';
import { X } from 'lucide-react';
import { SavedConfig } from '../types';

interface SavedConfigsProps {
  savedConfigs: SavedConfig[];
  onLoad: (savedConfig: SavedConfig) => void;
  onDelete: (configName: string) => void;
}

export const SavedConfigs: React.FC<SavedConfigsProps> = ({
  savedConfigs,
  onLoad,
  onDelete
}) => {
  if (savedConfigs.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Saved Configurations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedConfigs.map((savedConfig, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border relative">
            <button 
              onClick={() => onDelete(savedConfig.name)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
            <h4 className="font-medium mb-2 pr-6">{savedConfig.name}</h4>
            <p className="text-sm text-gray-600 mb-3">
              {new Date(savedConfig.timestamp).toLocaleDateString()}
            </p>
            <button 
              onClick={() => onLoad(savedConfig)} 
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};