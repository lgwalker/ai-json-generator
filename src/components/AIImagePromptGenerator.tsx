import React, { useState, useEffect } from 'react';
import { Config, CategoryMetadata, SavedConfig } from '../types';
import { useModal } from '../hooks/useModal';
import { useDropdown } from '../hooks/useDropdown';
import { 
  PRESET_OPTIONS, 
  INITIAL_CONFIG, 
  INITIAL_CATEGORY_METADATA 
} from '../constants';
import { 
  generateJSON, 
  downloadJSON, 
  copyToClipboard, 
  formatCharacteristicName 
} from '../utils';
import { Modal } from './Modal';
import { ControlPanel } from './ControlPanel';
import { SavedConfigs } from './SavedConfigs';
import { ConfigEditor } from './ConfigEditor';
import { JsonOutput } from './JSONOutput';

const AIImagePromptGenerator = () => {
  const [configName, setConfigName] = useState('');
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>(() => {
    const savedData = localStorage.getItem('aiGeneratorData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return parsedData.savedConfigs || [];
      } catch (error) {
        console.error('Error loading saved configs:', error);
        return [];
      }
    }
    return [];
  });
  const [customInputs, setCustomInputs] = useState<Record<string, boolean>>({});
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);
  const [categoryMetadata, setCategoryMetadata] = useState<CategoryMetadata>(INITIAL_CATEGORY_METADATA);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('aiGeneratorData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.config) {
          setConfig(parsedData.config);
        }
        if (parsedData.categoryMetadata) {
          setCategoryMetadata(parsedData.categoryMetadata);
        }
        if (parsedData.configName) {
          setConfigName(parsedData.configName);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const saveData = {
      config,
      categoryMetadata,
      configName,
      savedConfigs
    };
    localStorage.setItem('aiGeneratorData', JSON.stringify(saveData));
  }, [config, categoryMetadata, configName, savedConfigs]);

  const { 
    modal, 
    showModal, 
    hideModal, 
    handleModalConfirm, 
    handleModalCancel, 
    handleModalKeyDown, 
    setModalInputValue 
  } = useModal();

  const { 
    openDropdowns, 
    dropdownRefs, 
    toggleDropdown, 
    closeDropdown 
  } = useDropdown();

  const updateConfig = (category: string, field: string, value: string) => {
    if (category === 'root') {
      setConfig(prev => ({ ...prev, [field]: value }));
    } else {
      setConfig(prev => ({
        ...prev,
        [category]: { ...prev[category], [field]: value }
      }));
    }
  };

  const addCategory = () => {
    showModal('prompt', 'Add Category', 'Enter category name:', (categoryName) => {
      if (!categoryName || !categoryName.trim()) return;

      const categoryKey = categoryName.toLowerCase().replace(/\s+/g, '_');
      if (config[categoryKey]) {
        showModal('alert', 'Error', 'Category already exists!', () => {});
        return;
      }

      setConfig(prev => ({ ...prev, [categoryKey]: {} }));
      setCategoryMetadata(prev => ({
        ...prev,
        [categoryKey]: { name: categoryName, color: 'blue-900' }
      }));
    }, null, '');
  };

  const addCharacteristic = (category: string) => {
    showModal('prompt', 'Add Characteristic', 'Enter characteristic name:', (charName) => {
      if (!charName || !charName.trim()) return;

      const charKey = charName.toLowerCase().replace(/\s+/g, '_');
      if (config[category][charKey] !== undefined) {
        showModal('alert', 'Error', 'Characteristic already exists in this category!', () => {});
        return;
      }

      setConfig(prev => ({
        ...prev,
        [category]: { ...prev[category], [charKey]: '' }
      }));
    }, null, '');
    closeDropdown(category);
  };

  const removeCategory = (categoryKey: string) => {
    showModal('confirm', 'Delete Category', `Are you sure you want to remove the "${categoryMetadata[categoryKey]?.name}" category?`, () => {
      setConfig(prev => {
        const newConfig = { ...prev };
        delete newConfig[categoryKey];
        return newConfig;
      });

      setCategoryMetadata(prev => {
        const newMetadata = { ...prev };
        delete newMetadata[categoryKey];
        return newMetadata;
      });
    });
    closeDropdown(categoryKey);
  };

  const removeCharacteristic = (category: string, characteristic: string) => {
    showModal('confirm', 'Delete Characteristic', `Are you sure you want to remove "${characteristic}"?`, () => {
      setConfig(prev => {
        const newConfig = { ...prev };
        delete newConfig[category][characteristic];
        return newConfig;
      });
    });
  };

  const handleCustomInputToggle = (customInputKey: string, isCustom: boolean, category: string, characteristic: string, value: string) => {
    setCustomInputs(prev => ({ ...prev, [customInputKey]: isCustom }));
    updateConfig(category, characteristic, value);
  };

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(generateJSON(config));
    if (success) {
      showModal('alert', 'Success', 'JSON copied to clipboard!', () => {});
    } else {
      showModal('alert', 'Error', 'Failed to copy to clipboard', () => {});
    }
  };

  const handleDownloadJSON = () => {
    if (!configName) {
      showModal('alert', 'Error', 'Please enter a configuration name', () => {});
      return;
    }
    downloadJSON(generateJSON(config), configName);
  };

  const handleUploadJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.json')) {
      showModal('alert', 'Error', 'Please upload a JSON file', () => {});
      return;
    }
    event.target.value = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setConfig(jsonData);
        setConfigName(file.name.replace('.json', ''));
        setCustomInputs({});
        Object.keys(jsonData).forEach(key => {
          if (key !== 'subject' && !categoryMetadata[key]) {
            setCategoryMetadata(prev => ({
              ...prev,
              [key]: { name: `${formatCharacteristicName(key)}`, color: 'indigo' }
            }));
          }
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        showModal('alert', 'Error', `Error uploading JSON file: ${(error as Error).message}`, () => {});
      }
    };
    reader.onerror = () => showModal('alert', 'Error', 'Error reading file', () => {});
    reader.readAsText(file);
  };

  const saveConfig = () => {
    if (!configName) {
      showModal('alert', 'Error', 'Please enter a configuration name', () => {});
      return;
    }
    const configToSave: SavedConfig = {
      name: configName,
      config: { ...config },
      categoryMetadata: { ...categoryMetadata },
      timestamp: new Date().toISOString()
    };
    setSavedConfigs(prev => {
      const filtered = prev.filter(c => c.name !== configName);
      return [...filtered, configToSave];
    });
    showModal('alert', 'Success', 'Configuration saved!', () => {});
  };

  const loadSavedConfig = (savedConfig: SavedConfig) => {
    // Reset custom inputs state
    setCustomInputs({});
    
    // Update config and metadata
    setConfig(savedConfig.config);
    setCategoryMetadata(savedConfig.categoryMetadata);
    setConfigName(savedConfig.name);
    
    // Update custom inputs based on the loaded config
    Object.entries(savedConfig.config).forEach(([category, values]) => {
      if (category === 'subject') return;
      
      Object.entries(values).forEach(([field, value]) => {
        if (!PRESET_OPTIONS[category as keyof typeof PRESET_OPTIONS]?.includes(value as string)) {
          const customInputKey = `${category}_${field}`;
          setCustomInputs(prev => ({ ...prev, [customInputKey]: true }));
        }
      });
    });

    showModal('alert', 'Success', 'Configuration loaded!', () => {});
  };

  const deleteSavedConfig = (configName: string) => {
    showModal('confirm', 'Delete Configuration', `Are you sure you want to delete "${configName}"?`, () => {
      setSavedConfigs(prev => prev.filter(config => config.name !== configName));
    });
  };

  const clearAll = () => {
    // Reset to the exact initial state when the component mounted
    setConfig(INITIAL_CONFIG);
    setCategoryMetadata(INITIAL_CATEGORY_METADATA);
    setConfigName('');
    setCustomInputs({});
    
    // Reset all dropdown states
    Object.keys(openDropdowns).forEach(key => {
      closeDropdown(key);
    });

    // Ensure all default characteristics are restored
    Object.entries(INITIAL_CONFIG).forEach(([category, characteristics]) => {
      if (category === 'subject') return; // Skip subject as it's handled differently
      
      // Ensure all default characteristics exist in the config
      Object.keys(characteristics).forEach(characteristic => {
        if (!config[category]?.[characteristic]) {
          setConfig(prev => ({
            ...prev,
            [category]: { ...prev[category], [characteristic]: '' }
          }));
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Image Prompt Generator</h1>
          <p className="text-gray-600">Create structured JSON prompts for consistent AI image generation</p>
        </div>

        <Modal
          modal={modal}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          onKeyDown={handleModalKeyDown}
          onInputChange={setModalInputValue}
        />

        <ControlPanel
          configName={configName}
          setConfigName={setConfigName}
          onSave={saveConfig}
          onUpload={handleUploadJSON}
          onDownload={handleDownloadJSON}
          onClear={clearAll}
        />

        <SavedConfigs
          savedConfigs={savedConfigs}
          onLoad={loadSavedConfig}
          onDelete={deleteSavedConfig}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfigEditor
            config={config}
            categoryMetadata={categoryMetadata}
            presetOptions={PRESET_OPTIONS}
            customInputs={customInputs}
            openDropdowns={openDropdowns}
            dropdownRefs={dropdownRefs}
            onUpdateConfig={updateConfig}
            onToggleDropdown={toggleDropdown}
            onAddCategory={addCategory}
            onAddCharacteristic={addCharacteristic}
            onRemoveCategory={removeCategory}
            onRemoveCharacteristic={removeCharacteristic}
            onCustomInputToggle={handleCustomInputToggle}
          />

          <JsonOutput
            jsonOutput={generateJSON(config)}
            onCopy={handleCopyToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default AIImagePromptGenerator;