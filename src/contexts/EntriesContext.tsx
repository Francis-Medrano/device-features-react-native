import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry } from '../types/Entry';

interface EntriesContextType {
  entries: Entry[];
  addEntry: (entry: Entry) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  loadEntries: () => Promise<void>;
  clearAllEntries: () => Promise<void>;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Load entries on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('entries');
      if (stored !== null) {
        setEntries(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  }, []);

  const addEntry = useCallback(
    async (entry: Entry) => {
      try {
        const updated = [entry, ...entries];
        setEntries(updated);
        await AsyncStorage.setItem('entries', JSON.stringify(updated));
      } catch (error) {
        console.error('Error adding entry:', error);
        throw error;
      }
    },
    [entries]
  );

  const removeEntry = useCallback(
    async (id: string) => {
      try {
        const updated = entries.filter((entry) => entry.id !== id);
        setEntries(updated);
        await AsyncStorage.setItem('entries', JSON.stringify(updated));
      } catch (error) {
        console.error('Error removing entry:', error);
        throw error;
      }
    },
    [entries]
  );

  const clearAllEntries = useCallback(async () => {
    try {
      setEntries([]);
      await AsyncStorage.removeItem('entries');
    } catch (error) {
      console.error('Error clearing entries:', error);
      throw error;
    }
  }, []);

  return (
    <EntriesContext.Provider value={{ entries, addEntry, removeEntry, loadEntries, clearAllEntries }}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error('useEntries must be used within EntriesProvider');
  }
  return context;
};
