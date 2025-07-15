import { Config } from '../types';

export const removeEmptyValues = (obj: any): any => {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nestedCleaned = removeEmptyValues(obj[key]);
      if (Object.keys(nestedCleaned).length > 0) {
        cleaned[key] = nestedCleaned;
      }
    } else if (obj[key] && obj[key].toString().trim() !== '') {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
};

export const generateJSON = (config: Config): string => {
  const cleanedConfig = removeEmptyValues(config);
  
  // Convert comma-separated strings to arrays
  const formattedConfig = Object.entries(cleanedConfig).reduce((acc, [key, value]) => {
    if (typeof value === 'string' && value.includes(',')) {
      acc[key] = value.split(',').map(v => v.trim()).filter(v => v.length > 0);
    } else if (typeof value === 'object' && value !== null) {
      acc[key] = Object.entries(value).reduce((objAcc: Record<string, any>, [subKey, subValue]) => {
        if (typeof subValue === 'string' && subValue.includes(',')) {
          objAcc[subKey] = subValue.split(',').map(v => v.trim()).filter(v => v.length > 0);
        } else {
          objAcc[subKey] = subValue;
        }
        return objAcc;
      }, {});
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Config);
  
  return JSON.stringify(formattedConfig, null, 2);
};

export const formatCharacteristicName = (key: string): string => {
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getColorClasses = (color: string): string => {
  return 'border-blue-900';
};

export const getCustomInputKey = (category: string, characteristic: string): string => {
  return `${category}-${characteristic}`;
};

export const convertUnderscoresToSpaces = (filename: string): string => {
  return filename.replace(/_/g, ' ');
};

export const downloadJSON = (jsonData: string, filename: string): void => {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  // Replace spaces with underscores in the filename
  a.download = `${filename.replace(/\s+/g, '_')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};