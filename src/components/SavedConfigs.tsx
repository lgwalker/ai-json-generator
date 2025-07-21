import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(true);

  if (savedConfigs.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Saved Configurations</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {savedConfigs.map((savedConfig, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 border relative">
              <button 
                onClick={() => onDelete(savedConfig.name)} 
                className="absolute top-1 right-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X size={14} />
              </button>
              <h4 className="font-medium mb-1 pr-5 text-sm">{savedConfig.name}</h4>
              <p className="text-xs text-gray-600 mb-2">
                {new Date(savedConfig.timestamp).toLocaleDateString()}
              </p>
              <button 
                onClick={() => onLoad(savedConfig)} 
                className="w-full px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
              >
                Load
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};