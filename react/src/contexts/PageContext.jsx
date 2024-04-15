// src/contexts/PageContext.js
import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext({
    setPage: () => { },
    setSteps: () => { },
    page: "",
    steps: []
});

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState("");
    const [steps, setSteps] = useState([]);

    return (
        <PageContext.Provider value={{ page, setPage, steps, setSteps }}>
            {children}
        </PageContext.Provider>
    );
};
