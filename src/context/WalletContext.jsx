import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import getWalletBalanceService from '../services/walletServices/getWalletBalanceService';
export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);

  const refreshBalance = async () => {
    try {
      const currentBalance = await getWalletBalanceService();
      setBalance(currentBalance);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch wallet balance')
      return false;
    }
  }

  return (
    <WalletContext.Provider value={{ balance, refreshBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
