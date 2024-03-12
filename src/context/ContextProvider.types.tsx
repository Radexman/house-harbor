import { ReactNode } from 'react';

export type ContextProviderProps = {
  children: ReactNode;
};

export type ContextProps = {
  theme: string;
  changeTheme: () => void;
};
