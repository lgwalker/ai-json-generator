import React, { useRef } from 'react';
import { Download, Upload, Save, Trash2 } from 'lucide-react';

interface ControlPanelProps {
  configName: string;
  setConfigName: (name: string) => void;
  onSave: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onClear: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  configName,
  setConfigName,
  onSave,
  onUpload,
  onDownload,
  onClear
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Configuration name..."
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button 
          onClick={onSave} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          <Save size={16} /> Save
        </button>
        <input 
          type="file" 
          accept=".json" 
          onChange={onUpload} 
          ref={fileInputRef} 
          className="hidden" 
        />
        <button 
          onClick={handleUploadClick} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <Upload size={16} /> Upload
        </button>
        <button 
          onClick={onDownload} 
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          <Download size={16} /> Download
        </button>
        <button 
          onClick={onClear} 
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>
    </div>
  );
};