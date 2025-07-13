import React from 'react';
import { Copy } from 'lucide-react';

interface JsonOutputProps {
  jsonOutput: string;
  onCopy: () => void;
}

export const JsonOutput: React.FC<JsonOutputProps> = ({ jsonOutput, onCopy }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Generated JSON</h2>
        <button 
          onClick={onCopy} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          <Copy size={16} /> Copy
        </button>
      </div>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto h-96 text-sm">
        {jsonOutput}
      </pre>
    </div>
  );
};