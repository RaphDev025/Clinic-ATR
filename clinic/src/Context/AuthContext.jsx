// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(/* Initial user data, or null */);

    const login = (userData) => {
        // Your login logic
        setUser(userData);
    };

    const logout = () => {
        // Your logout logic
        setUser(null);
    };

    const updateUser = (updatedUserData) => {
        // Update the user data in the context
        setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
