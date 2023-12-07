import React, { createContext, useContext, useState } from 'react';

// Create the context
const PreOrderContext = createContext();

// Create a context provider
const PreOrderProvider = ({ children }) => {
  const [preOrderDetails, setPreOrderDetails] = useState(null);

  const setDetails = (details) => {
    setPreOrderDetails(details);
  };

  const resetDetails = () => {
    setPreOrderDetails(null);
  };

  return (
    <PreOrderContext.Provider value={{ preOrderDetails, setDetails, resetDetails }}>
      {children}
    </PreOrderContext.Provider>
  );
};

// Create a custom hook for using the PreOrderContext
const usePreOrder = () => {
  const context = useContext(PreOrderContext);
  if (!context) {
    throw new Error('usePreOrder must be used within a PreOrderProvider');
  }
  return context;
};

export { PreOrderProvider, usePreOrder };
