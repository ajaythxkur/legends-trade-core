'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextType {
  isVisible: boolean;
  drawerContent: ReactNode;
  openDrawer: (content: ReactNode) => void;
  closeDrawer: () => void;
  toggleDrawer: (content: ReactNode) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [drawerContent, setDrawerContent] = useState<ReactNode>(null);

  const openDrawer = (content: ReactNode): void => {
    setDrawerContent(content);
    setIsVisible(true);
  };

  const closeDrawer = (): void => {
    setIsVisible(false);
    // Optional: Clear content after animation completes
    setTimeout(() => setDrawerContent(null), 300);
  };

  const toggleDrawer = (content: ReactNode): void => {
    if (isVisible) {
      closeDrawer();
    } else {
      openDrawer(content);
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        isVisible,
        drawerContent,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};