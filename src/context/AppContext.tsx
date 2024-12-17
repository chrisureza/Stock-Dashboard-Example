import React, { createContext, useState, useContext } from 'react';
import { Stock } from '../Interfaces/Stock.interface';

interface AppState {
  data: Stock[];
  setData: React.Dispatch<React.SetStateAction<Stock[]>>;
  totalBalance: number;
  setTotalBalance: React.Dispatch<React.SetStateAction<number>>;
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Stock[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [filterString, setFilterString] = useState<string>('');

  return (
    <AppContext.Provider value={{ data, setData, totalBalance, setTotalBalance, setFilterString, filterString }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};