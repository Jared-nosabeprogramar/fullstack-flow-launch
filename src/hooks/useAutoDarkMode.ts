import { useEffect } from 'react';

export const useAutoDarkMode = () => {
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Dark mode between 6 PM (18) and 7 AM (7)
      const isDarkTime = hour >= 18 || hour < 7;
      
      if (isDarkTime) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Check immediately
    checkTime();
    
    // Check every minute
    const interval = setInterval(checkTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
};
