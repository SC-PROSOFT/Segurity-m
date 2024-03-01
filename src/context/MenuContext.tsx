import React, {createContext, useContext, useState, ReactNode} from 'react';

interface Menu {
  visible: boolean;
}

interface MenuContextType {
  showMenu: () => void;
  hideMenu: () => void;
  menu: Menu;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [menu, setMenu] = useState<Menu>({
    visible: false,
  });

  const showMenu = () => {
    setMenu({visible: true});
  };

  const hideMenu = () => {
    setMenu({visible: false});
  };

  return (
    <MenuContext.Provider value={{showMenu, hideMenu, menu}}>
      {children}
    </MenuContext.Provider>
  );
};

export const menuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMyFunction must be used within a MyFunctionProvider');
  }
  return context;
};
