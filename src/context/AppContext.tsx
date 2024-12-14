import React, { createContext, useState, useContext } from 'react';
import { Stock } from '../Interfaces/Stock.interface';

interface AppState {
  data: Stock[];
  setData: React.Dispatch<React.SetStateAction<Stock[]>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Stock[]>([]);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};