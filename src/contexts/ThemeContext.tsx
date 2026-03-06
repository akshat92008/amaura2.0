import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandConfig } from '../types';

interface ThemeContextType {
  brandConfig: BrandConfig;
  setBrandConfig: (config: BrandConfig) => void;
}

const defaultBrandConfig: BrandConfig = {
  primaryColor: '#7C3AED', // Amaura purple default
  companyName: 'Amaura Studio',
};

const ThemeContext = createContext<ThemeContextType>({
  brandConfig: defaultBrandConfig,
  setBrandConfig: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrandConfig);

  useEffect(() => {
    // Apply dynamic primary color to CSS variables when config changes
    if (brandConfig.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', brandConfig.primaryColor);
    }
  }, [brandConfig]);

  return (
    <ThemeContext.Provider value={{ brandConfig, setBrandConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
