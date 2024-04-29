import { useState } from 'react'
import './App.css'
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { PageProvider } from './contexts/PageContext';

i18next.init({
  interpolation: { escapeValue: false },
});

export const App = () => {
  return (
    <BrowserRouter>
      <PageProvider>
        <I18nextProvider i18n={i18next}>
          <Router />
        </I18nextProvider>
      </PageProvider>
    </BrowserRouter>
  );
};



export default App; 