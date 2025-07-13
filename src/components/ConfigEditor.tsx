import React from 'react';
import { Plus, MoreVertical, X } from 'lucide-react';
import { Config, CategoryMetadata, PresetOptions } from '../types';
import { formatCharacteristicName, getColorClasses, getCustomInputKey } from '../utils';

interface ConfigEditorProps {
  config: Config;
  categoryMetadata: CategoryMetadata;
  presetOptions: PresetOptions;
  customInputs: Record<string, boolean>;
  openDropdowns: Record<string, boolean>;
  dropdownRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onUpdateConfig: (category: string, field: string, value: string) => void;
  onToggleDropdown: (categoryKey: string) => void;
  onAddCategory: () => void;
  onAddCharacteristic: (category: string) => void;
  onRemoveCategory: (categoryKey: string) => void;
  onRemoveCharacteristic: (category: string, characteristic: string) => void;
  onCustomInputToggle: (customInputKey: string, isCustom: boolean, category: string, characteristic: string, value: string) => void;
}

export const ConfigEditor: React.FC<ConfigEditorProps> = ({
  config,
  categoryMetadata,
  presetOptions,
  customInputs,
  openDropdowns,
  dropdownRefs,
  onUpdateConfig,
  onToggleDropdown,
  onAddCategory,
  onAddCharacteristic,
  onRemoveCategory,
  onRemoveCharacteristic,
  onCustomInputToggle
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Configure Your Image</h2>
        <button 
          onClick={onAddCategory} 
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="space-y-6">
        <div className="border-l-4 border-blue-900 pl-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Subject</label>
          <input
            type="text"
            value={config.subject}
            onChange={(e) => onUpdateConfig('root', 'subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., portrait of a woman"
          />
        </div>

        {Object.entries(config).map(([categoryKey, categoryValue]) => {
          if (categoryKey === 'subject' || typeof categoryValue !== 'object') return null;
          const metadata = categoryMetadata[categoryKey];
          if (!metadata) return null;

          return (
            <div key={categoryKey} className={`border-l-4 ${getColorClasses(metadata.color)} pl-4`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">{metadata.name}</h3>
                <div className="relative">
                  <button 
                    onClick={() => onToggleDropdown(categoryKey)}
                    className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {openDropdowns[categoryKey] && (
                    <div 
                      ref={el => dropdownRefs.current[categoryKey] = el}
                      className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => onAddCharacteristic(categoryKey)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={14} />
                          Add Characteristic
                        </button>
                        <button
                          onClick={() => onRemoveCategory(categoryKey)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <X size={14} />
                          Delete Category
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(categoryValue).map(([characteristic, value]) => {
                  const hasPresets = presetOptions[characteristic];
                  const customInputKey = getCustomInputKey(categoryKey, characteristic);
                  const isCustomMode = customInputs[customInputKey];

                  return (
                    <div key={characteristic}>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">
                          {formatCharacteristicName(characteristic)}
                        </label>
                        <button 
                          onClick={() => onRemoveCharacteristic(categoryKey, characteristic)} 
                          className="text-red-300 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>

                      {hasPresets ? (
                        <>
                          <select
                            value={isCustomMode ? 'custom' : (hasPresets.includes(value as string) ? value as string : '')}
                            onChange={(e) => {
                              const selectedValue = e.target.value as string;
                              if (selectedValue === 'custom') {
                                onCustomInputToggle(customInputKey, true, categoryKey, characteristic, '');
                              } else {
                                onCustomInputToggle(customInputKey, false, categoryKey, characteristic, selectedValue);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-1"
                          >
                            <option value="">Select {formatCharacteristicName(characteristic)}...</option>
                            {hasPresets.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                            <option value="custom">Custom...</option>
                          </select>

                          {isCustomMode && (
                            <input
                              type="text"
                              value={value as string}
                              onChange={(e) => onUpdateConfig(categoryKey, characteristic, e.target.value)}
                              className="w-full px-3 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder={`Enter custom ${formatCharacteristicName(characteristic)}...`}
                            />
                          )}
                        </>
                      ) : (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) => onUpdateConfig(categoryKey, characteristic, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter ${formatCharacteristicName(characteristic)}...`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};