'use client';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';

interface DrawerContextType {
  isVisible: boolean;
  drawerContent: ReactNode;
  openDrawer: (content: ReactNode) => void;
  closeDrawer: () => void;
  toggleDrawer: (content: ReactNode) => void;
  drawerRef: React.RefObject<HTMLDivElement | null>
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
  const drawerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

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
  useEffect(() => {
    if (isVisible) {
      closeDrawer();
    }
  }, [pathname])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isVisible && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  return (
    <DrawerContext.Provider
      value={{
        isVisible,
        drawerContent,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        drawerRef,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};