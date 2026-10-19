import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as defaultSiteConfig, SiteConfig, uploadedImages } from '../config/siteConfig';

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  resetConfig: () => void;
  isCustomized: boolean;
  uploadedImages: typeof uploadedImages;
}

const STORAGE_KEY = 'lumina_site_config_v1';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure images array has 6 items and required fields
        if (parsed && Array.isArray(parsed.images) && parsed.images.length === 6) {
          return {
            ...defaultSiteConfig,
            ...parsed,
          };
        }
      }
    } catch {
      // Fallback to defaultSiteConfig if parsing fails
    }
    return defaultSiteConfig;
  });

  const [isCustomized, setIsCustomized] = useState<boolean>(() => {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  });

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setIsCustomized(true);
    } catch (err) {
      console.error('Failed to save configuration to localStorage', err);
    }
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear configuration from localStorage', err);
    }
    setConfig(defaultSiteConfig);
    setIsCustomized(false);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isCustomized,
        uploadedImages,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useSiteConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a ConfigProvider');
  }
  return context;
};
