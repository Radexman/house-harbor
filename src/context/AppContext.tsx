import { createContext, useEffect, useState } from 'react';
import { ContextProps, ContextProviderProps } from './ContextProvider.types';

const AppContext = createContext({} as ContextProps);

export function AppContextProvider({ children }: ContextProviderProps) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme')! : 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html')?.setAttribute('data-theme', localTheme!);
  }, [theme]);

  const changeTheme = () => {
    setTheme(theme === 'winter' ? 'dark' : 'winter');
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AppContext.Provider value={{ theme, changeTheme }}>{children}</AppContext.Provider>;
}

export default AppContext;
