import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NightModeContextType {
  nightMode: boolean;
  toggleNightMode: () => void;
}

const NightModeContext = createContext<NightModeContextType>({
  nightMode: false,
  toggleNightMode: () => {},
});

export const useNightMode = (): NightModeContextType => useContext(NightModeContext);

interface NightModeProviderProps {
  children: ReactNode;
}

export const NightModeProvider: React.FC<NightModeProviderProps> = ({ children }) => {
  const [nightMode, setNightMode] = useState<boolean>(false);

  const toggleNightMode = () => {
    setNightMode((prevNightMode) => !prevNightMode);
  };

  return (
    <NightModeContext.Provider value={{ nightMode, toggleNightMode }}>
      {children}
    </NightModeContext.Provider>
  );
};
