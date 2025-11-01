
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getConvertedPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CONVERSION_RATE_USD_TO_INR = 83.5;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCurrency = localStorage.getItem('devaura-currency') as Currency;
      if (savedCurrency && ['USD', 'INR'].includes(savedCurrency)) {
        setCurrencyState(savedCurrency);
      }
    } catch (error) {
      console.warn('Could not read currency from localStorage:', error);
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem('devaura-currency', newCurrency);
    } catch (error) {
      console.error('Could not save currency to localStorage:', error);
    }
  };

  const getConvertedPrice = (price: number) => {
    if (currency === 'INR') {
      const convertedPrice = price * CONVERSION_RATE_USD_TO_INR;
      return `₹${convertedPrice.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `$${price.toFixed(2)}`;
  };
  
  const value = useMemo(() => ({
    currency,
    setCurrency,
    getConvertedPrice
  }), [currency]);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
