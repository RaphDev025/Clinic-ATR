import React, { createContext, useContext, useState } from 'react';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItems = (newItems) => {
        setItems((prevItems) => [...prevItems, ...newItems]);
    };

    const clearItems = () => {
        setItems([]);
    };

    const resetItems = () => {
        // Implement any additional logic needed before resetting (if necessary)
        clearItems();
    };

    return (
        <ItemsContext.Provider value={{ items, addItems, clearItems, resetItems }}>
        {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
};
