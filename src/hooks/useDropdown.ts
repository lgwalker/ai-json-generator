import { useState, useRef, useEffect } from 'react';

export const useDropdown = () => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleDropdown = (categoryKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const closeDropdown = (categoryKey: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [categoryKey]: false
    }));
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openDropdowns).forEach(categoryKey => {
        if (openDropdowns[categoryKey] && dropdownRefs.current[categoryKey]) {
          if (!dropdownRefs.current[categoryKey]?.contains(event.target as Node)) {
            closeDropdown(categoryKey);
          }
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdowns]);

  return {
    openDropdowns,
    dropdownRefs,
    toggleDropdown,
    closeDropdown
  };
};